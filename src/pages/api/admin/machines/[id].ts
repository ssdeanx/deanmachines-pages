import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const machineUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        res.status(403).json({ message: 'Not authorized' });
        return;
    }

    const { id } = req.query;
     if (typeof id !== 'string') {
        res.status(400).json({ message: 'Invalid machine ID' });
        return;
    }
    const machineId = parseInt(id, 10);

    if (isNaN(machineId)) {
        res.status(400).json({ message: 'Invalid machine ID' });
        return;
    }


    if (req.method === 'PUT') {
        try {
            const validatedData = machineUpdateSchema.parse(req.body);

            const updatedMachine = await prisma.machine.update({
                where: { id: machineId },
                data: validatedData,
            });
            res.status(200).json(updatedMachine);
        } catch (error) {
            console.error(error);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: 'Invalid input', errors: error.errors });
            }
            else{
                res.status(500).json({ message: 'Error updating machine' });
            }
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.machine.delete({
                where: { id: machineId },
            });
            res.status(204).end(); // No content
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting machine' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
} 