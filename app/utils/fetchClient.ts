// lib/fetchClient.ts
export const fetchClient = async <T = unknown>(
  path: string,
  body: unknown = {},
  method: "POST" | "PUT" | "PATCH" = "POST"
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log("Base URL:", baseUrl); // Debugging line
  if (!baseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Did you restart your dev server?"
    );
  }
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
