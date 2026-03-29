const BASE_URL = 
process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

 if (!res.ok) {
  const error = await res.json().catch(() => null);

  throw new Error(
    error?.message || "Request failed. Please try again."
  );
}

  return res.json();
}