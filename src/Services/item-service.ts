import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import itemRepository, {insertItemParams, ItemsParams} from "@/Repositories/item-repository";
import listRepository from "@/Repositories/list-repository";

async function findListLocalItems(listLocalId: number) {
  const listItems = await itemRepository.findListItemsByListLocalId(listLocalId);

  return listItems;
}

async function createItem(listLocalsId: number, itemData: insertItemParams) {
  const item = await verifyItem(itemData.name);

  const listLocalsItemsParams: ItemsParams = {
    listLocalsId,
    itemId: item?.id,
    checked: itemData.checked,
    quantity: itemData.quantity,
    unit: itemData.unit,
  }

  if(!item){
    //fazer transaction disso aqui
    const createdItem = await itemRepository.createItem(itemData.name);

    return createListLocalsItems({
      ...listLocalsItemsParams,
      itemId: createdItem.id
    });
  }
 
  return createListLocalsItems(listLocalsItemsParams);
}

async function verifyItem(itemName: string) {
  return itemRepository.findItemByName(itemName);
}

async function createListLocalsItems(data: ItemsParams) {
  return itemRepository.createListLocalsItems(data);
}

const itemService = {
  findListLocalItems,
  createItem
};

export default itemService;