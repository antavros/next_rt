import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        accounts: {
          create: {
            provider: 'credentials',
            type: 'credentials',
            providerAccountId: email,
            password: hashedPassword,
          },
        },
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: `Error creating user: ${error.message}` });
  }
}
