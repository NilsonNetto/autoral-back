import { prisma } from "@/Configs";
import { listLocalsItemsParams } from "@/Services/item-service";
import { itemStatus, items, listsLocalsItems } from "@prisma/client";

async function findListItemsByListLocalId(listLocalId: number) {
  return prisma.listsLocals.findMany({
    where: {
      id: listLocalId
    },
    include: {
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
    }
  })
}

async function createItem(itemParams: itemParams) {
  return prisma.items.create({
    data: {
      name: itemParams.name,
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

export type itemParams = Pick<items, "name">

export type insertItemParams = itemParams & Pick<listsLocalsItems, "status"|"quantity" | "unit">

const itemRepository = {
  findListItemsByListLocalId,
  findItemByNameAndComplement,
  createItem,
  createListLocalsItems
};

export default itemRepository;