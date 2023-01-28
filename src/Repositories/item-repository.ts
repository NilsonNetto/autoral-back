import { prisma } from "@/Configs";
import { items, listsLocalsItems } from "@prisma/client";

async function findListItemsByListLocalId(listLocalId: number) {
  return prisma.listsLocals.findFirst({
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

async function findItemByName(name: string) {
  return prisma.items.findFirst({
    where:{
      name
    }
  })
}

async function createItem(name: string) {
  return prisma.items.create({
    data: {
      name,
    }
  })
}

async function createListLocalsItems(data: listLocalsItemsParams) {
  return prisma.listsLocalsItems.create({
    data
  })
}

export type itemParams = Pick<items, "name">

export type insertItemParams = itemParams & Pick<listsLocalsItems, "checked" | "quantity" | "unit">

export type listLocalsItemsParams = Pick<listsLocalsItems, "listLocalsId" | "itemId" | "checked" | "quantity" | "unit">


const itemRepository = {
  findListItemsByListLocalId,
  findItemByName,
  createItem,
  createListLocalsItems
};

export default itemRepository;