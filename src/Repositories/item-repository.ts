import { prisma } from "@/Configs";
import { itemParams, listLocalsItemsParams } from "@/Services/item-service";
import { itemStatus } from "@prisma/client";

async function findListItemsByListId(listId: number) {
  return prisma.listsLocals.findMany({
    where: {
      listId
    },
    include: {
      locals: true,
      listLocalsItems: {
        include: {
          items: true
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    },
    orderBy: {
      localId: "asc"
    }
  })
}

async function findItemByNameAndComplement(itemParams: itemParams) {
  return prisma.items.findFirst({
    where:{
      name: itemParams.name,
      complement: itemParams.complement
    }
  })
}

async function createItem(itemParams: itemParams) {
  return prisma.items.create({
    data: {
      name: itemParams.name,
      complement: itemParams.complement
    }
  })
}

async function createListLocalsItems(listLocalsItemsParams: listLocalsItemsParams) {
  return prisma.listsLocalsItems.create({
    data: {
      ...listLocalsItemsParams,
      status: itemStatus.uncheck
    }
  })
}


const itemRepository = {
  findListItemsByListId,
  findItemByNameAndComplement,
  createItem,
  createListLocalsItems
};

export default itemRepository;