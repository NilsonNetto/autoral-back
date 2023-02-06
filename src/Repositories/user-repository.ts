import { prisma } from "@/Configs";
import { Users } from "@prisma/client";

async function createUser(data: registerParams) {
  return prisma.users.create({
    data
  })
}

async function findUserByUserId(id: number) {
  return prisma.users.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      email: true,
      name: true,
      profilePicture: true
    }
  })
}

async function findUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: {
      email :{
        contains: email,
        mode: 'insensitive'
      }
    }
  })
}

async function updateUserByUserId(id: number, data: registerParams) {
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

export type loginParams = Pick<Users, "email" | "password">;

export type registerParams = Pick<Users, "name" | "email" | "password">;

export type pictureParams = Pick<Users, "profilePicture">;

const userRepository = {
  createUser,
  findUserByUserId,
  findUserByEmail,
  updateUserByUserId,
  updateUserPictureByUserId
};

export default userRepository;