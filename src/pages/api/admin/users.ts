import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const userCreateSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'USER']),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        res.status(403).json({ message: 'Not authorized' });
        return;
    }

    if (req.method === 'GET') {
        // Pagination parameters
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const skip = (page - 1) * pageSize;

        try {
            const users = await prisma.user.findMany({
                skip,
                take: pageSize,
            });

            const totalCount = await prisma.user.count(); // Get total count for pagination

            res.status(200).json({ users, totalCount });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching users' });
        }
    } else if (req.method === 'POST') {
        try {
            const validatedData = userCreateSchema.parse(req.body);
            const newUser = await prisma.user.create({
                data: validatedData,
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: 'Invalid input', errors: error.errors });
            } else {
                res.status(500).json({ message: 'Error creating user' });
            }
        }
    }
     else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
