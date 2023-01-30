import { prisma } from "@/Configs";
import { LocalsName } from "@prisma/client";

async function findLocalByListId(listId: number) {
  return prisma.listsLocals.findMany({
    where: {
      listId
    },
    include: {
      LocalsName : true
    }
  })
}

async function findLocalByNameAndComplement(data: localParams) {
  return prisma.localsName.findFirst({
    where:{
      name: data.name,
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

export type localParams = Pick<LocalsName, "name">

const localRepository = {
  findLocalByListId,
  findLocalByNameAndComplement,
  createLocal,
  createListLocal
};

export default localRepository;