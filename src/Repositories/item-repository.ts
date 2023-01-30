import { prisma } from "@/Configs";
import { ItemsName, Items } from "@prisma/client";

async function findListItemsByListLocalId(listLocalId: number) {
  return prisma.listsLocals.findFirst({
    where: {
      id: listLocalId
    },
    include: {
      LocalsName: true,
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

async function createItemName(name: string) {
  return prisma.itemsName.create({
    data: {
      name,
    }
  })
}

async function createItem(data: ItemsParams) {
  return prisma.items.create({
    data
  })
}

async function updateCheckedItem(itemId: number) {
  return prisma.items.update({
    where: {
      id: itemId
    },
    data: {
      checked: true
    }
  })
}

async function updateItem(itemId: number, itemData: updateItemParams) {
  return prisma.items.update({
    where: {
      id: itemId
    },
    data: {
      itemNameId: itemData.itemNameId,
      quantity: itemData.quantity,
      unit: itemData.unit,
      updatedAt: new Date()
    }
  })
}

async function deleteItem(itemId: number) {
  return prisma.items.delete({
    where: {
      id: itemId
    }
  })
}

async function deleteItemByListLocalId(listLocalId: number) {
  return prisma.items.deleteMany({
    where: {
      listLocalsId: listLocalId
    }
  })
}

export type itemParams = Pick<ItemsName, "name">

export type insertItemParams = itemParams & Pick<Items, "quantity" | "unit">

export type ItemsParams = Pick<Items, "listLocalsId" | "itemNameId" | "quantity" | "unit">

export type updateItemParams = Omit<ItemsParams, "listLocalsId">

const itemRepository = {
  findListItemsByListLocalId,
  findItemByName,
  createItemName,
  createItem,
  updateCheckedItem,
  updateItem,
  deleteItem,
  deleteItemByListLocalId
};

export default itemRepository;