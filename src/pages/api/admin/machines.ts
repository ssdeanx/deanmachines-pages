// pages/api/admin/machines.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // Your NextAuth config
import prisma from "../../../lib/prisma"; // Your Prisma client
import { NextApiRequest, NextApiResponse } from "next";
import { z } from 'zod';

const machineCreateSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    category: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "ADMIN") {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  if (req.method === "GET") {
    try {
      const machines = await prisma.machine.findMany();
      res.status(200).json(machines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching machines" });
    }
  }
  else if (req.method === 'POST') {
        try {
            const validatedData = machineCreateSchema.parse(req.body); // Validate request body
            const newMachine = await prisma.machine.create({
                data: validatedData,
            });
            res.status(201).json(newMachine);
        } catch (error) {
            console.error(error);
            if (error instanceof z.ZodError) {
                // If validation error, return 400 with error details
                res.status(400).json({ message: 'Invalid input', errors: error.errors });
            } else {
                // For other errors, return 500
                res.status(500).json({ message: 'Error creating machine' });
            }
        }
    }
   else {
    res.status(405).json({ message: "Method not allowed" });
  }
}