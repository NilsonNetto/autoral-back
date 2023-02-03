import { cannotModifyError, invalidListIdError, invalidListStatusError } from "@/Errors";
import { alreadyFinishedError } from "@/Errors/already-finished-error";
import { notFoundDataError } from "@/Errors/not-found-data-error";
import itemRepository from "@/Repositories/item-repository";
import listRepository from "@/Repositories/list-repository";
import localRepository, {localParams} from "@/Repositories/local-repository"

async function findListLocals(listId: number) {
  const listLocals = await localRepository.findLocalsByListId(listId);

  if(!listLocals){
    throw notFoundDataError();
  }

  return listLocals;
}

async function createLocal(userId: number, listId: number, localData: localParams) {
  await verifyListId(listId);
  
  await verifyUserList(userId, listId);

  const local = await verifyLocal(localData);

  if(!local) {
    //fazer transition disso aqui
    const createdLocal = await localRepository.createLocal(localData);

    return createListLocal(listId, createdLocal.id);
  }
  
  return createListLocal(listId, local.id);
}

async function updateFinishedLocal(userId: number, listLocalId: number) {
  const listLocal = await verifyListLocal(listLocalId);

  await verifyUserList(userId, listLocal.listId);

  const updatedLocal = await localRepository.updateFinishedLocal(listLocalId);
  
  await verifyFinishList(listLocal.listId);

  return updatedLocal;
}

async function updateLocalName(userId: number, listLocalId: number, localData: localParams) {
  const listLocal = await verifyListLocal(listLocalId);

  await verifyUserList(userId, listLocal.listId);
  
  const local = await verifyLocal(localData);

  if(!local) {
    //fazer transition disso aqui
    const createdLocal = await localRepository.createLocal(localData);

    return updateListLocal(listLocalId, createdLocal.id);
  }
  
  return updateListLocal(listLocalId, local.id);
}

async function deleteListLocal(userId: number, listLocalId: number) {
  const listLocal = await verifyListLocal(listLocalId);

  await verifyUserList(userId, listLocal.listId);

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

async function verifyFinishList(listId: number) {
  const listLocals = await localRepository.findLocalsByListId(listId);

  const filterFinished = listLocals.filter(local => local.finished);

  if(filterFinished.length === listLocals.length)

  return listRepository.updateFinishedList(listId);
}

async function verifyUserList(userId: number, listId: number) {
  const userList = await listRepository.findUserListByUserIdAndListId(userId, listId)

  if(!userList || !userList.shared){
    throw cannotModifyError();
  }

  return userList;
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