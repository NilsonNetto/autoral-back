import { prisma } from "@/Configs";
import { ItemsName, Items } from "@prisma/client";

async function findListItemsByListLocalId(listLocalId: number) {
  return prisma.listsLocals.findFirst({
    where: {
      id: listLocalId
    },
    include: {
      Items: {
        include: {
          ItemName: true
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
  return prisma.itemsName.findFirst({
    where:{
      name
    }
  })
}

async function createItem(name: string) {
  return prisma.itemsName.create({
    data: {
      name,
    }
  })
}

async function createListLocalsItems(data: ItemsParams) {
  return prisma.items.create({
    data
  })
}

export type itemParams = Pick<ItemsName, "name">

export type insertItemParams = itemParams & Pick<Items, "checked" | "quantity" | "unit">

export type ItemsParams = Pick<Items, "listLocalsId" | "itemId" | "checked" | "quantity" | "unit">


const itemRepository = {
  findListItemsByListLocalId,
  findItemByName,
  createItem,
  createListLocalsItems
};

export default itemRepository;