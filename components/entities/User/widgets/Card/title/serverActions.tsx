"use server";

import { markTitle } from "@/components/Entities/User/Shared";

export async function markTitleAction(
  mark: "favourite" | "viewed" | "bookmark",
  id: string,
  type: string,
  name: string,
  engname: string,
  description: string,
  image: string
) {
  await markTitle({ mark, id, type, name, engname, description, image });
}
