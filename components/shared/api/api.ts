import { redirect } from "next/navigation";

export async function getData<T = any>({
  url,
  cacheMode = "force-cache",
  revalidate = 9991209600,
}: {
  url: string;
  cacheMode?: RequestCache;
  revalidate?: number;
}): Promise<T | null> {
  const API_KEY = process.env.API_TOKEN;

  if (!API_KEY) {
    console.error("API_KEY is missing. Redirecting to the error page.");
    redirect(`/error`);
    return null;
  }
console.log(url)
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY,
    },
    next: {
      cache: cacheMode,
      revalidate,
    } as any,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
      console.error(`Response error text: ${errorText}`);
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const json = await response.json();

    if (!json) throw new Error("Empty response");

    return json as T;
  } catch (error: unknown) {
    console.error("Error in getData:", error);
    if (error instanceof Error) {
      console.error(error.message);
    }
    redirect(`/`);
    return null;
  }
}
