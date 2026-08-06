import { postJson } from "./api";

export interface AuthResult {
  email: string;
}

function postAuth(
  path: "signup" | "signin",
  email: string,
  password: string
): Promise<AuthResult> {
  return postJson(`/api/auth/${path}`, { email, password });
}

export function signUp(email: string, password: string): Promise<AuthResult> {
  return postAuth("signup", email, password);
}

export function signIn(email: string, password: string): Promise<AuthResult> {
  return postAuth("signin", email, password);
}
