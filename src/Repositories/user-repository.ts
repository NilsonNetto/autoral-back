import { prisma } from "@/Configs";
import { Prisma, Users } from "@prisma/client";

async function createUser(data: Prisma.UsersUncheckedCreateInput) {
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

async function updateUserByUserId(id: number, data: Prisma.UsersUncheckedCreateInput) {
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

export type pictureParams = Pick<Users, "profilePicture">;

const userRepository = {
  createUser,
  findUserByUserId,
  findUserByEmail,
  updateUserByUserId,
  updateUserPictureByUserId
};

export default userRepository;