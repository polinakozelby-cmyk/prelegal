from unittest.mock import MagicMock, patch

from prelegal_backend.nda_chat import NdaChatResponse, NdaFields


def _mock_completion_response(reply: str, fields: NdaFields) -> MagicMock:
    payload = NdaChatResponse(reply=reply, fields=fields)
    mock_response = MagicMock()
    mock_response.choices[0].message.content = payload.model_dump_json(by_alias=True)
    return mock_response


def test_chat_extracts_fields_from_conversation(client):
    fields = NdaFields(party1_name="Alice")
    mock_response = _mock_completion_response("Got it, what's party 2's name?", fields)

    with patch("prelegal_backend.nda_chat.completion", return_value=mock_response) as mock_completion:
        response = client.post(
            "/api/nda/chat",
            json={
                "messages": [{"role": "user", "content": "Party 1 is Alice"}],
                "fields": {},
            },
        )

    assert response.status_code == 200
    body = response.json()
    assert body["reply"] == "Got it, what's party 2's name?"
    assert body["fields"]["party1Name"] == "Alice"
    assert mock_completion.call_args.kwargs["model"] == "openai/gpt-5-mini"


def test_chat_returns_502_when_ai_call_fails(client):
    with patch("prelegal_backend.nda_chat.completion", side_effect=RuntimeError("boom")):
        response = client.post(
            "/api/nda/chat",
            json={"messages": [{"role": "user", "content": "hi"}], "fields": {}},
        )

    assert response.status_code == 502


def test_chat_request_accepts_camel_case_fields(client):
    mock_response = _mock_completion_response("Thanks!", NdaFields(governing_law="Delaware"))

    with patch("prelegal_backend.nda_chat.completion", return_value=mock_response):
        response = client.post(
            "/api/nda/chat",
            json={
                "messages": [],
                "fields": {"governingLaw": "Delaware"},
            },
        )

    assert response.status_code == 200
    assert response.json()["fields"]["governingLaw"] == "Delaware"


def test_chat_preserves_known_fields_the_model_omits(client):
    known_fields = {"party1Name": "Alice", "party1Company": "Acme"}
    mock_response = _mock_completion_response(
        "What's party 2's name?", NdaFields(party2_name="Bob")
    )

    with patch("prelegal_backend.nda_chat.completion", return_value=mock_response):
        response = client.post(
            "/api/nda/chat",
            json={"messages": [{"role": "user", "content": "Party 2 is Bob"}], "fields": known_fields},
        )

    assert response.status_code == 200
    body = response.json()["fields"]
    assert body["party1Name"] == "Alice"
    assert body["party1Company"] == "Acme"
    assert body["party2Name"] == "Bob"
