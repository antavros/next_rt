"use server";

import { redirect } from "next/navigation";

import { getDetails } from "./data_types";

export async function getData({ url }: any) {
  const API_KEY = process.env.API_TOKEN;

  if (!API_KEY) {
    redirect(`/error`); // Если API ключ отсутствует, выполняем редирект на главную
    return;
  }

  const options: any = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY,
      cache: "force-cache",
    },
    next: {
      cache: "force-cache",
      revalidate: 9991209600,
    },
  };

  try {
    console.log(`Fetching data from URL: ${url}`);
    console.log(`Using API Key: ${API_KEY}`);
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
      console.error(`Response error text: ${errorText}`);
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const responseData = await response.json();

    if (!responseData) {
      throw new Error("Received empty response data");
    }

    const details = await getDetails({ details: responseData });
    // console.log(details)

    return details;
  } catch (error: any) {
    console.error("getData error:", error);
    redirect(`/`); // В случае ошибки выполняем редирект на главную
    return;
  }
}
