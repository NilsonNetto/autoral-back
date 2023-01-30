import { prisma } from "@/Configs";
import { Prisma, Lists } from "@prisma/client";

async function findListsByUserId(userId: number) {
  return prisma.usersLists.findMany({
    where: {
      userId
    },
    include: {
      Lists: true
    },
    orderBy: {
      createdAt: "desc"
    } 
  })
}

async function findListsByListId(listId: number) {
  return prisma.lists.findFirst({
    where: {
      id: listId
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

async function createList(data: Prisma.ListsUncheckedCreateInput) {
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
      finished: true,
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

export type listParams = Pick<Lists, "name">


const listRepository = {
  findListsByUserId,
  findListsByListId,
  findListByListId,
  findUserListByUserIdAndListId,
  createList,
  updateFinishedList,
  createUserList,
  createSharedUserList
};

export default listRepository;