from typing import Literal

from fastapi import APIRouter, HTTPException
from litellm import completion
from pydantic import BaseModel, ConfigDict

router = APIRouter(prefix="/api/nda", tags=["nda"])

MODEL = "openai/gpt-5-mini"

NDA_FIELD_LABELS = {
    "party1_name": "Party 1 name",
    "party1_company": "Party 1 company",
    "party2_name": "Party 2 name",
    "party2_company": "Party 2 company",
    "effective_date": "Effective date (YYYY-MM-DD)",
    "governing_law": "Governing law (US state)",
    "jurisdiction": "Jurisdiction (city or county, state)",
}


def _to_camel(field_name: str) -> str:
    first, *rest = field_name.split("_")
    return first + "".join(word.capitalize() for word in rest)


class NdaFields(BaseModel):
    model_config = ConfigDict(alias_generator=_to_camel, populate_by_name=True)

    party1_name: str = ""
    party1_company: str = ""
    party2_name: str = ""
    party2_company: str = ""
    effective_date: str = ""
    governing_law: str = ""
    jurisdiction: str = ""


class ChatTurnMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class NdaChatRequest(BaseModel):
    messages: list[ChatTurnMessage]
    fields: NdaFields


class NdaChatResponse(BaseModel):
    reply: str
    fields: NdaFields


def _build_system_prompt(known_fields: NdaFields) -> str:
    known_lines = "\n".join(
        f"- {label}: {getattr(known_fields, name) or '(not yet known)'}"
        for name, label in NDA_FIELD_LABELS.items()
    )
    return (
        "You are helping a user fill in the cover page of a Mutual Non-Disclosure "
        "Agreement through a friendly, freeform conversation. Ask about one or two "
        "related fields at a time rather than listing everything at once. The fields "
        "you need are:\n"
        f"{known_lines}\n\n"
        "Effective date already defaults to today; only change it if the user "
        "specifies a different date. Always respond with the full current value of "
        "every field (keep previously known values unless the user corrects them, "
        "leave a field as an empty string if it's still unknown). Once every field "
        "is known, briefly confirm the details and let the user know they can "
        "download the document, but keep answering if they want to change anything."
    )


def run_chat_turn(payload: NdaChatRequest) -> NdaChatResponse:
    messages = [{"role": "system", "content": _build_system_prompt(payload.fields)}]
    messages += [{"role": m.role, "content": m.content} for m in payload.messages]

    try:
        response = completion(
            model=MODEL,
            messages=messages,
            response_format=NdaChatResponse,
            reasoning_effort="low",
        )
    except Exception as exc:
        raise HTTPException(
            status_code=502, detail="The AI assistant is unavailable. Please try again."
        ) from exc

    parsed = NdaChatResponse.model_validate_json(response.choices[0].message.content)

    merged_fields = NdaFields(
        **{
            name: getattr(parsed.fields, name) or getattr(payload.fields, name)
            for name in NdaFields.model_fields
        }
    )
    return NdaChatResponse(reply=parsed.reply, fields=merged_fields)


@router.post("/chat", response_model=NdaChatResponse)
def nda_chat(payload: NdaChatRequest) -> NdaChatResponse:
    return run_chat_turn(payload)
