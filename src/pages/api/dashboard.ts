import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Import the prisma instance

// Define the DashboardData type to match the API response in the frontend
interface DashboardData {
  id: string;
  overview: string;
  quickActions: string;
  recentActivity: string;
  createdAt: string; // Keep as string or convert to Date if needed
  updatedAt: string; // Keep as string or convert to Date if needed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardData> // Specify the response type
) {
  try {
    // Fetch the latest dashboard data from the database
    const dashboardData = await (prisma as any).dashboardData.findFirst({
      orderBy: {
        updatedAt: 'desc', // Get the most recently updated entry
      },
    });

    if (dashboardData) {
      // Convert Date objects to strings if necessary
      const formattedDashboardData: DashboardData = {
        id: dashboardData.id,
        overview: dashboardData.overview,
        quickActions: dashboardData.quickActions,
        recentActivity: dashboardData.recentActivity,
        createdAt: dashboardData.createdAt.toISOString(), // Convert to string
        updatedAt: dashboardData.updatedAt.toISOString(), // Convert to string
      };
      res.status(200).json(formattedDashboardData);
    } else {
      res.status(404).json({
        id: '',
        overview: 'No dashboard data found',
        quickActions: '',
        recentActivity: '',
        createdAt: '',
        updatedAt: '',
      });
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    res.status(500).json({
      id: '',
      overview: 'Failed to fetch dashboard data',
      quickActions: '',
      recentActivity: '',
      createdAt: '',
      updatedAt: '',
    });
  } finally {
    await prisma.$disconnect();
  }
}
