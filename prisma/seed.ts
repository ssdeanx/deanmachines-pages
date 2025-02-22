import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create initial DashboardData
    await (prisma as any).dashboardData.create({
      data: {
        overview: 'Welcome to your new dashboard!',
        quickActions: 'Check your recent activity and update your profile.',
        recentActivity: 'No recent activity yet.',
      },
    });

    console.log('Successfully seeded the database with DashboardData.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('Seeding complete.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
