"use server";

import { getDetails } from "./data_types";

export async function getData({ url }: any) {
  const API_KEY = process.env.API_TOKEN;

  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const options: any = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY,
    },
    next: {
      revalidate: 1209600,
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

    return details;
  } catch (error: any) {
    console.error("getData error:", error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
