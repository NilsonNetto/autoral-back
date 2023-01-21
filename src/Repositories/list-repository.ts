import { prisma } from "@/Configs";
import { Prisma, listStatus } from "@prisma/client";

async function findListsByUserId(userId: number) {
  return prisma.usersLists.findMany({
    where: {
      userId
    },
    include: {
      lists: true
    }
  })
}

async function findListByListId(listId: number) {
  return prisma.lists.findFirst({
    where: {
      id: listId
    }
  })
}

async function findUserListByUserIdAndListId(userId: number, listId: number) {
  return prisma.usersLists.findFirst({
    where: {
      userId,
      listId
    }
  })
}

async function createList(data: Prisma.listsUncheckedCreateInput) {
  return prisma.lists.create({
    data
  })
}

async function updateFinishedList(listId: number) {
  return prisma.lists.update({
    where: {
      id: listId
    },
    data: {
      status: listStatus.finished,
      updatedAt: new Date()
    }
  })
}

async function createUserList(userId: number, listId: number) {
  return prisma.usersLists.create({
    data:{
      userId,
      listId,
      owner: true,
      shared: true
    }
  })
}

async function createSharedUserList(userId: number, listId: number) {
  return prisma.usersLists.create({
    data:{
      userId,
      listId,
      owner: false,
      shared: null
    }
  })
}

const listRepository = {
  findListsByUserId,
  findListByListId,
  findUserListByUserIdAndListId,
  createList,
  updateFinishedList,
  createUserList,
  createSharedUserList
};

export default listRepository;