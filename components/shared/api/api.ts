"use server";

import { redirect } from "next/navigation";
import { getDetails } from "./data_types";

export async function getData({ url }: { url: string }) {
  const API_KEY = process.env.API_TOKEN;

  // Проверка наличия API ключа
  if (!API_KEY) {
    console.error("API_KEY is missing. Redirecting to the error page.");
    redirect(`/error`);
    return;
  }

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY,
    },
    next: {
      cache: "force-cache",
      revalidate: 9991209600,
    } as any,
  };

  try {
    const response = await fetch(url, options);

    // Проверка статуса ответа
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
      console.error(`Response error text: ${errorText}`);
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Проверка данных ответа
    if (!responseData) {
      throw new Error("Received empty response data");
    }

    const details = await getDetails({ details: responseData });

    return details;
  } catch (error: unknown) {
    console.error("Error in getData:", error);

    // Редирект в случае ошибки
    redirect(`/`);
    return;
  }
}
