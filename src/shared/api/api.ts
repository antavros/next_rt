'use server';

import { getDetails } from './data_types';

export async function getData({ url }: any) {
  const API_KEY = process.env.NEXT_PUBLIC_API_TOKEN;

  const options: any = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
    next: {
      revalidate: 999999999,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const responseData = await response.json();

    const details = await getDetails({ details: responseData });

    return details;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}
