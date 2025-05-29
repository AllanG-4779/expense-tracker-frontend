// lib/fetchClient.ts
export const fetchClient = async <T = unknown>(
  path: string,
  body: unknown = {},
  method: "POST" | "PUT" | "PATCH" | "GET" | "DELETE" = "POST",
  authenticated: boolean = false,
  token: string = ""
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("Base URL:", baseUrl); // Debugging line
  console.log("Access token :", token); // Debugging line
  if (!baseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Did you restart your dev server?"
    );
  }

  if (authenticated && !token) {
    // localStorage.clear();
    const lToken = JSON.parse(localStorage.getItem("token") || "{}");
    if (!lToken) {
      throw new Error("No token found for authenticated request");
    }
    console.log("Using token from localStorage:", lToken); // Debugging line
    token = lToken.token || lToken.accessToken || lToken.token;
  }
  const headers: HeadersInit = authenticated
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
  console.log("Headers:", headers); // Debugging line
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: headers,
    body: method !== "GET" ? JSON.stringify(body) : undefined,
  });

  return res.json();
};
