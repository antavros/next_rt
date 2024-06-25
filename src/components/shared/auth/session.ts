import { auth } from "./auth";

export default async function handler(req: any, res: any) {
  try {
    const session = await auth();
    res.status(200).json({ user: session?.user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}