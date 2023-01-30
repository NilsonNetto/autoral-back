import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import itemRepository, {insertItemParams, ItemsParams, updateItemParams} from "@/Repositories/item-repository";
import listRepository from "@/Repositories/list-repository";

async function findListLocalItems(listLocalId: number) {
  const listItems = await itemRepository.findListItemsByListLocalId(listLocalId);

  return listItems;
}

async function createItem(listLocalsId: number, itemData: insertItemParams) {
  const itemName = await verifyItem(itemData.name);

  const ItemParam: ItemsParams = {
    listLocalsId,
    itemNameId: itemName?.id,
    quantity: itemData.quantity,
    unit: itemData.unit,
  }

  if(!itemName){
    //fazer transaction disso aqui
    const createdItem = await itemRepository.createItemName(itemData.name);

    return insertItem({
      ...ItemParam,
      itemNameId: createdItem.id
    });
  }
 
  return insertItem(ItemParam);
}

async function checkItem(itemId: number) {
  return itemRepository.updateCheckedItem(itemId);
}

async function updateItem(itemId: number, itemData: insertItemParams) {
  const itemName = await verifyItem(itemData.name);

  const updateItemParam: updateItemParams = {
    itemNameId: itemName?.id,
    quantity: itemData.quantity,
    unit: itemData.unit,
  }

  if(!itemName){
    //fazer transaction disso aqui
    const createdItemName = await itemRepository.createItemName(itemData.name);

    return insertUpdatedItem(itemId, {
      ...updateItemParam,
      itemNameId: createdItemName.id
    });
  }
 
  return insertUpdatedItem(itemId, updateItemParam);
}

async function deleteItem(itemId: number) {
  return itemRepository.deleteItem(itemId);
}

async function verifyItem(itemName: string) {
  return itemRepository.findItemByName(itemName);
}

async function insertItem(data: ItemsParams) {
  return itemRepository.createItem(data);
}

async function insertUpdatedItem(itemId: number, data: updateItemParams) {
  return itemRepository.updateItem(itemId, data)
}

const itemService = {
  findListLocalItems,
  createItem,
  checkItem,
  updateItem,
  deleteItem
};

export default itemService;