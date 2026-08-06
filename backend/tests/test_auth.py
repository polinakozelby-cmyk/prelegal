def test_signup_creates_user(client):
    response = client.post(
        "/api/auth/signup",
        json={"email": "alice@example.com", "password": "hunter22"},
    )

    assert response.status_code == 201
    assert response.json() == {"email": "alice@example.com"}


def test_signup_duplicate_email_is_rejected(client):
    payload = {"email": "bob@example.com", "password": "hunter22"}
    client.post("/api/auth/signup", json=payload)

    response = client.post("/api/auth/signup", json=payload)

    assert response.status_code == 409


def test_signin_with_correct_password_succeeds(client):
    payload = {"email": "carol@example.com", "password": "hunter22"}
    client.post("/api/auth/signup", json=payload)

    response = client.post("/api/auth/signin", json=payload)

    assert response.status_code == 200
    assert response.json() == {"email": "carol@example.com"}


def test_signin_with_wrong_password_fails(client):
    client.post(
        "/api/auth/signup",
        json={"email": "dave@example.com", "password": "hunter22"},
    )

    response = client.post(
        "/api/auth/signin",
        json={"email": "dave@example.com", "password": "wrong-password"},
    )

    assert response.status_code == 401


def test_signin_with_unknown_email_fails(client):
    response = client.post(
        "/api/auth/signin",
        json={"email": "nobody@example.com", "password": "hunter22"},
    )

    assert response.status_code == 401


def test_signup_rejects_password_over_72_bytes(client):
    response = client.post(
        "/api/auth/signup",
        json={"email": "eve@example.com", "password": "a" * 73},
    )

    assert response.status_code == 422


def test_signin_rejects_password_over_72_bytes(client):
    response = client.post(
        "/api/auth/signin",
        json={"email": "eve@example.com", "password": "a" * 73},
    )

    assert response.status_code == 422


def test_signin_email_is_case_insensitive(client):
    client.post(
        "/api/auth/signup",
        json={"email": "Frank@Example.com", "password": "hunter22"},
    )

    response = client.post(
        "/api/auth/signin",
        json={"email": "frank@example.com", "password": "hunter22"},
    )

    assert response.status_code == 200
    assert response.json() == {"email": "frank@example.com"}


def test_signup_email_uniqueness_is_case_insensitive(client):
    client.post(
        "/api/auth/signup",
        json={"email": "Grace@Example.com", "password": "hunter22"},
    )

    response = client.post(
        "/api/auth/signup",
        json={"email": "grace@example.com", "password": "hunter22"},
    )

    assert response.status_code == 409
