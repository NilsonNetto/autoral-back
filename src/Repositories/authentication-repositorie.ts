import { prisma } from "@/Configs";
import { Prisma } from "@prisma/client";

async function createUser(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data
  })
}

const authenticationRepository = {
  createUser,
};

export default authenticationRepository;