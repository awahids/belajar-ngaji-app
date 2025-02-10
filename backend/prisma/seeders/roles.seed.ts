import { RoleValue } from '../../src/constant/enum/role.type';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  const roles = [
    { name: 'Admin', value: RoleValue.ADMIN },
    { name: 'Teacher', value: RoleValue.TEACHER },
    { name: 'Student', value: RoleValue.STUDENT },
  ];

  await prisma.roles.deleteMany();

  for (const role of roles) {
    await prisma.roles.create({
      data: role,
    });
  }

  console.log('Roles seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });