const fetchFromAPI = async <T = unknown>(
  path: string,
  options: RequestInit = {},
  baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"
): Promise<T> => {
  if (!baseUrl) throw new Error("Missing API_BASE_URL env variable");

  const url = `${baseUrl}${path}`;

  const isJson = options.body && typeof options.body === "object";

  const finalHeaders = {
    "Content-Type": isJson ? "application/json" : "text/plain",
    ...options.headers,
  };

  const res = await fetch(url, {
    method: options.method || "GET",
    headers: finalHeaders,
    body: isJson ? JSON.stringify(options.body) : options.body,
    next: { revalidate: 0 }, // disable cache if needed
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Fetch failed (${res.status}): ${errorText}`);
  }
  console.log("Response:", res);

  return res.json();
};

export default fetchFromAPI;
