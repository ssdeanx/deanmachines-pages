// pages/api/admin/machines.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // Your NextAuth config
import prisma from "../../../lib/prisma"; // Your Prisma client
import { NextApiRequest, NextApiResponse } from "next";

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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}