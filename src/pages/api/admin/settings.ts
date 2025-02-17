import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]'; // Adjust path if necessary
import prisma from '@/lib/prisma'; // Assuming prisma client is in '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user?.role !== "ADMIN") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === 'GET') {
        try {
            // Fetch all settings from the database.
            // Assuming you have a Settings model in Prisma, adjust accordingly.
            const settings = await prisma.setting.findMany(); // Or however you fetch your settings

            return res.status(200).json(settings);
        } catch (error) {
            console.error("Error fetching settings:", error);
            return res.status(500).json({ message: "Failed to fetch settings" });
        }
    } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        try {
            const settingsData = req.body;

            if (!settingsData || typeof settingsData !== 'object') {
                return res.status(400).json({ message: "Invalid settings data in request body" });
            }

            // Update or create settings in the database.
            // This is a basic example, you might need more specific logic
            // depending on how you want to handle settings updates (e.g., individual settings vs. bulk update).

            // Example: Assuming settingsData is an array of settings to update/create
            if (Array.isArray(settingsData)) {
                await Promise.all(settingsData.map(async (setting) => {
                    if (setting && setting.id) {
                        // Update existing setting (assuming settings have an 'id' to identify them)
                        await prisma.setting.update({
                            where: { id: setting.id },
                            data: setting, // Adjust data based on your setting structure
                        });
                    } else {
                        // Create a new setting (if no 'id' is provided or you want to create new ones)
                        await prisma.setting.create({
                            data: setting, // Adjust data based on your setting structure
                        });
                    }
                }));
            } else {
                // Example: If you are updating a single set of settings (not individual settings)
                // You might need to adjust this based on your actual settings structure and update logic.
                 await prisma.setting.upsert({ // Using upsert to create or update
                     where: { id: 'default-settings-id' }, // Define a unique identifier for your settings, adjust as needed
                     update: settingsData,
                     create: settingsData,
                 });
            }


            return res.status(200).json({ message: "Settings updated successfully" });
        } catch (error) {
            console.error("Error updating settings:", error);
            return res.status(500).json({ message: "Failed to update settings" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
