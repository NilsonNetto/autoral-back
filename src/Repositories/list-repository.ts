import { prisma } from "@/Configs";
import { Lists } from "@prisma/client";

async function findListsByUserId(userId: number) {
  return prisma.usersLists.findMany({    
    where: {
      userId,
      shared: true,
      Lists :{
        finished: false
      }
    },
    select:{
      id: true,
      owner: true,
      Lists: {
        select: {
          id: true,
          name: true,
          createdAt: true, 
        },
      }
    },
    orderBy: {
      createdAt: "desc"
    } 
  })
}

async function findListByListId(id: number) {
  return prisma.lists.findFirst({
    where: {
      id
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

async function createList(data: listParams) {
  return prisma.lists.create({
    data
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
      shared: true
    }
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

export type listParams = Pick<Lists, "name">

const listRepository = {
  findListsByUserId,
  findListByListId,
  findUserListByUserIdAndListId,
  createList,
  createUserList,
  createSharedUserList,
  updateFinishedList,

};

export default listRepository;