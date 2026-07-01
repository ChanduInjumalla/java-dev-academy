import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const newPassword = 'Chandu@7995';
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  await prisma.user.updateMany({
    where: { email: 'admin@javadev.com' },
    data: { passwordHash }
  });
  
  console.log('Password updated successfully for admin@javadev.com');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
