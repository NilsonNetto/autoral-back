import { prisma } from "@/Configs";
import { locals } from "@prisma/client";

async function findLocalByListId(listId: number) {
  return prisma.listsLocals.findMany({
    where: {
      listId
    },
    include: {
      locals: true
    }
  })
}

async function findLocalByNameAndComplement(data: localParams) {
  return prisma.locals.findFirst({
    where:{
      name: data.name,
    }
  })
}

async function createLocal(data: localParams) {
  return prisma.locals.create({
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

export type localParams = Pick<locals, "name">

const localRepository = {
  findLocalByListId,
  findLocalByNameAndComplement,
  createLocal,
  createListLocal
};

export default localRepository;