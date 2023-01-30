import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import itemRepository from "@/Repositories/item-repository";
import listRepository from "@/Repositories/list-repository";
import localRepository, {localParams} from "@/Repositories/local-repository"

async function findListLocals(listId: number) {
  const listLocals = await localRepository.findLocalsByListId(listId);

  return listLocals;
}

async function createLocal(listId: number, localData: localParams) {
  await verifyListId(listId);

  const local = await verifyLocal(localData);

  if(!local) {
    //fazer transition disso aqui
    const createdLocal = await localRepository.createLocal(localData);

    return createListLocal(listId, createdLocal.id);
  }
  
  return createListLocal(listId, local.id);
}

async function updateFinishedLocal(listLocalId: number) {

  return localRepository.updateFinishedLocal(listLocalId);
}

async function updateLocalName(listLocalId: number, localData: localParams) {
  const local = await verifyLocal(localData);

  if(!local) {
    //fazer transition disso aqui
    const createdLocal = await localRepository.createLocal(localData);

    return updateListLocal(listLocalId, createdLocal.id);
  }
  
  return updateListLocal(listLocalId, local.id);
}

async function deleteListLocal(listLocalId: number) {
  //fazer transition disso aqui
  await itemRepository.deleteItemByListLocalId(listLocalId);
 
  return localRepository.deleteListLocal(listLocalId);
}

async function verifyListId(listId: number) {
  const list = await listRepository.findListByListId(listId);

  if(!list){
    throw invalidListIdError();
  }

  if(list.finished === true) {
    throw invalidListStatusError();
  }

  return list;
}

async function verifyLocal(localData: localParams) {
  return localRepository.findLocalByName(localData);
}

async function createListLocal(listId: number, localId: number) {
  return localRepository.createListLocal(listId, localId)
}

async function updateListLocal(listLocalId: number, localId: number) {
  return localRepository.updateLocalName(listLocalId, localId)
}

const localService = {
  findListLocals,
  createLocal,
  updateFinishedLocal,
  updateLocalName,
  deleteListLocal
};

export default localService;