import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import itemRepository from "@/Repositories/item-repository";
import listRepository from "@/Repositories/list-repository";
import { items, listsLocals, listsLocalsItems } from "@prisma/client";

async function findListItems(listId: number) {
  const listItems = await itemRepository.findListItemsByListId(listId);

  return listItems;
}

async function createItem(listLocalsId: number, itemData: insertItemParams) {
  const itemParams: itemParams = {
    name: itemData.name,
    complement: itemData.complement
  }
  const item = await verifyItem(itemParams);

  if(!item){
    //fazer transaction disso aqui
    const createdItem = await itemRepository.createItem(itemParams);

    const listLocalsItemsParams: listLocalsItemsParams = {
      listLocalsId,
      itemId: createdItem.id,
      quantity: itemData.quantity,
      unit: itemData.unit
    }

    return createListLocalsItems(listLocalsItemsParams);
  }

  const listLocalsItemsParams: listLocalsItemsParams = {
    listLocalsId,
    itemId: item.id,
    quantity: itemData.quantity,
    unit: itemData.unit
  }

  return createListLocalsItems(listLocalsItemsParams);
}

async function verifyItem(itemParams: itemParams) {
  return itemRepository.findItemByNameAndComplement(itemParams);
}

async function createListLocalsItems(data: listLocalsItemsParams) {
  return itemRepository.createListLocalsItems(data);
}

export type itemParams = Pick<items, "name" | "complement">

export type insertItemParams = itemParams & Pick<listsLocalsItems, "quantity" | "unit">

export type listLocalsItemsParams = Pick<listsLocalsItems, "listLocalsId" | "itemId" | "quantity" | "unit">

const itemService = {
  findListItems,
  createItem
};

export default itemService;