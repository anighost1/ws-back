import { PrismaClient } from "@prisma/client";

import trigger from "./seeder/trigger.seed";


const prisma = new PrismaClient();

async function main() {
  await trigger();
  console.log("seed executed")
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
