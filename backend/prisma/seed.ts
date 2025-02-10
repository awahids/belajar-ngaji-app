import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // seeder Roles
  await import('./seeders/roles.seed');

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });