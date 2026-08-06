const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export interface AuthResult {
  email: string;
}

async function postAuth(
  path: "signup" | "signin",
  email: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${API_BASE_URL}/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail ?? "Something went wrong. Please try again.");
  }

  return response.json();
}

export function signUp(email: string, password: string): Promise<AuthResult> {
  return postAuth("signup", email, password);
}

export function signIn(email: string, password: string): Promise<AuthResult> {
  return postAuth("signin", email, password);
}
