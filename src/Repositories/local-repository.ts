import { prisma } from "@/Configs";
import { localParams } from "@/Services/local-service";

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
      complement: data.complement
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

const localRepository = {
  findLocalByListId,
  findLocalByNameAndComplement,
  createLocal,
  createListLocal
};

export default localRepository;