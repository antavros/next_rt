import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "@/components/shared/auth/serverActions";
import { z, ZodError } from "zod";

const registerSchema = z.object({
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
  email: z.string().email("Некорректный email"),
  name: z.string().min(1, "Имя не должно быть пустым"),
});

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = registerSchema.parse(req.body);
      const user = await registerUser(data.password, data.email, data.name);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(400).json({ error: "Ошибка при регистрации" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
};

export default registerHandler;
