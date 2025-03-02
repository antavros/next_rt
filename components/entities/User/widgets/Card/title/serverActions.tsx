"use server";

import { markTitle } from "@/components/entities/User/shared";

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
