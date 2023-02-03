import { prisma } from "@/Configs";
import { LocalsName } from "@prisma/client";

async function findLocalsByListId(listId: number) {
  return prisma.listsLocals.findMany({
    where: {
      listId
    },
    select:{
      id: true,
      listId: true,
      finished: true,
      LocalsName: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy :{
      createdAt: 'asc'
    }
  })
}

async function findLocalByName(data: localParams) {
  return prisma.localsName.findFirst({
    where:{
      name: data.name,
    }
  })
}

async function findlistLocalById(id: number) {
  return prisma.listsLocals.findFirst({
    where:{
      id
    }
  })
}

async function createLocal(data: localParams) {
  return prisma.localsName.create({
    data
  })
}

async function createListLocal(listId: number, localId: number) {
  return prisma.listsLocals.create({
    data: {
      listId,
      localId
    }
  })
}

async function updateFinishedLocal(listLocalId: number) {
  return prisma.listsLocals.update({
    where :{
      id: listLocalId
    },
    data: {
      finished: true,
      updatedAt: new Date()
    }
  })
}

async function updateLocalName(listLocalId: number, localId: number) {
  return prisma.listsLocals.update({
    where: {
      id: listLocalId
    },
    data: {
      localId
    }
  })
}

async function deleteListLocal(listLocalId: number) {
  return prisma.listsLocals.delete({
    where: {
      id: listLocalId
    }
  })
}

async function deleteListLocalsByListId(listId: number) {
  return prisma.listsLocals.deleteMany({
    where:{
      listId
    }
  })
}

export type localParams = Pick<LocalsName, "name">

const localRepository = {
  findLocalsByListId,
  findLocalByName,
  findlistLocalById,
  createLocal,
  createListLocal,
  updateFinishedLocal,
  updateLocalName,
  deleteListLocal,
  deleteListLocalsByListId
};

export default localRepository;