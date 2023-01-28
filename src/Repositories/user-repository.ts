import { prisma } from "@/Configs";
import { Prisma, users } from "@prisma/client";

async function createUser(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data
  })
}

async function findUserByUserId(id: number) {
  return prisma.users.findFirst({
    where: {
      id
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

async function updateUserByUserId(id: number, data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.update({
    where: {
      id
    },
    data
  })
}

async function updateUserPictureByUserId(id: number, data: pictureParams) {
  return prisma.users.update({
    where: {
      id
    },
    data
  })
}

export type pictureParams = Pick<users, "profilePicture">;

const userRepository = {
  createUser,
  findUserByUserId,
  findUserByEmail,
  updateUserByUserId,
  updateUserPictureByUserId
};

export default userRepository;