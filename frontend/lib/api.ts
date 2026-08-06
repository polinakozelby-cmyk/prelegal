const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.detail ?? "Something went wrong. Please try again.");
  }

  return response.json();
}
