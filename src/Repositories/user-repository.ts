import { prisma } from "@/Configs";
import { Prisma } from "@prisma/client";

async function createUser(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data
  })
}

async function findUserByUserId(userId: number) {
  return prisma.users.findFirst({
    where: {
      id: userId
    }
  })
}

async function findUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email
    }
  })
}

const userRepository = {
  createUser,
  findUserByUserId,
  findUserByEmail,
};

export default userRepository;