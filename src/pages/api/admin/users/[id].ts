import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z.enum(['ADMIN', 'USER']).optional(),
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        res.status(403).json({ message: 'Not authorized' });
        return;
    }

    const { id } = req.query;

    if (typeof id !== 'string') {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
    }

    if (req.method === 'PUT') {
        try {
            const validatedData = userUpdateSchema.parse(req.body);

            const updatedUser = await prisma.user.update({
                where: { id },
                data: validatedData,
            });
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
             if (error instanceof z.ZodError) {
                res.status(400).json({ message: 'Invalid input', errors: error.errors });
            }
            else{
                res.status(500).json({ message: 'Error updating user' });
            }
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.user.delete({
                where: { id },
            });
            res.status(204).end(); // No content
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
} 