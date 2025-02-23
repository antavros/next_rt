"use server";

import { markTitle } from "@/components/entities/User/shared";

export async function markTitleAction(
  mark: "favourite" | "viewed",
  id: string,
  type: string,
  name: string,
  engname: string,
  description: string,
  image: string
) {
  if (!mark || !id || !type || !name || !engname || !description || !image) {
    throw new Error("All arguments must be provided and not null");
  }
  await markTitle({ mark, id, type, name, engname, description, image });
}
