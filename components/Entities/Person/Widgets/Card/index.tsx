"use server";

import { ClientTitleCard } from "./ui";


export async function PersonCard({ details }: { readonly details: any }) {

  return <ClientTitleCard details={details} />;
}
