const SESSION_KEY = "prelegal_session_email";

export function getSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function setSessionEmail(email: string): void {
  window.localStorage.setItem(SESSION_KEY, email);
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
