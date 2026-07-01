import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = "admin@javadev.com";
  const password = "AdminPassword123!";
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: Role.SUPER_ADMIN,
      passwordHash
    },
    create: {
      email,
      username: "admin_super",
      name: "Super Admin",
      passwordHash,
      role: Role.SUPER_ADMIN,
    }
  });

  console.log("Admin user created/updated!");
  console.log("Email:", admin.email);
  console.log("Password:", password);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
