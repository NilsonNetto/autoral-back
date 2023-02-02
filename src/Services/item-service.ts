import { alreadyFinishedError, cannotModifyError, invalidListIdError, invalidListStatusError, notFoundDataError } from "@/Errors";
import itemRepository, {insertItemParams, ItemsParams, updateItemParams} from "@/Repositories/item-repository";
import listRepository from "@/Repositories/list-repository";
import localRepository from "@/Repositories/local-repository";

async function findListLocalItems(listLocalId: number) {
  const listItems = await itemRepository.findListItemsByListLocalId(listLocalId);

  if(!listItems){
    throw notFoundDataError();
  }

  return listItems;
}

async function createItem(userId: number, listLocalsId: number, itemData: insertItemParams) {
  const listLocal = await verifyListLocal(listLocalsId);

  await verifyList(listLocal.listId);

  await verifyUserList(userId, listLocal.listId);

  const itemName = await verifyItemName(itemData.name);

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

async function checkOrUncheckItem(userId: number, itemId: number) {
  const item = await verifyItem(itemId);

  const listLocal = await verifyListLocal(item.listLocalsId);

  await verifyList(listLocal.listId);

  await verifyUserList(userId, listLocal.listId);

  const checkOrUncheck = !item.checked;

  return itemRepository.updateItemCheck(itemId, checkOrUncheck);
}

async function updateItem(userId: number, itemId: number, itemData: insertItemParams) {
  const item = await verifyItem(itemId);

  const listLocal = await verifyListLocal(item.listLocalsId);

  await verifyList(listLocal.listId);

  await verifyUserList(userId, listLocal.listId);
  
  const itemName = await verifyItemName(itemData.name);

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

async function deleteItem(userId: number, itemId: number) {
  const item = await verifyItem(itemId);

  const listLocal = await verifyListLocal(item.listLocalsId);

  await verifyList(listLocal.listId);

  await verifyUserList(userId, listLocal.listId);
  
  return itemRepository.deleteItem(itemId);
}

async function verifyListLocal(listLocalId: number) {
  const listLocal = await localRepository.findlistLocalById(listLocalId);
  
  if(!listLocal){
    throw notFoundDataError();
  }
  
  if(listLocal.finished){
    throw alreadyFinishedError();
  }
  
  return listLocal;
}

async function verifyList(listId: number) {
  const list = await listRepository.findListByListId(listId);

  if(list.finished) {
    throw alreadyFinishedError();
  }

  return list;
}

async function verifyUserList(userId: number, listId: number) {
  const userList = await listRepository.findUserListByUserIdAndListId(userId, listId)

  if(!userList || !userList.shared){
    throw cannotModifyError();
  }

  return userList;
}

async function verifyItem(itemId: number) {
  const item = itemRepository.findItemById(itemId);

  if(!item){
    throw notFoundDataError();
  }

  return item;
}

async function verifyItemName(itemName: string) {
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
  checkOrUncheckItem,
  updateItem,
  deleteItem
};

export default itemService;