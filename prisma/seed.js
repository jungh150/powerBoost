import { PrismaClient } from '@prisma/client';
import { USER, POST } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  // 목 데이터 삽입
  await prisma.user.createMany({
    data: USER,
    skipDuplicates: true,
  });

  await prisma.post.createMany({
    data: POST,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
