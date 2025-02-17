import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface PrismaError {
  code: string;
  meta?: {
    target?: string[];
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const hashedPassword = await hash(password, 12);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error: unknown) {
      // Handle duplicate email error specifically
      if (error instanceof Error) {
        const prismaError = error as unknown as PrismaError; // Cast to PrismaError
        if (prismaError.code === 'P2002' && prismaError.meta?.target?.includes('email')) {
          return res.status(409).json({ message: 'Email already exists' });
        }
      }
      console.error("Signup error:", error);

      if(error instanceof Error) {
        return res.status(500).json({ message: error.message || 'Something went wrong' });
      } else {
        return res.status(500).json({ message: 'Something went wrong' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 