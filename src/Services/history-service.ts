import { invalidListOwnerError, invalidUserIdError, cannotFinishListError, invalidListIdError, invalidListStatusError } from "@/Errors";
import historyRepository from "@/Repositories/history-repository";

async function findAllListHistory(userId: number) {
  const allListsHistory = await historyRepository.findAllFinishedList(userId);

  return allListsHistory;
}

async function findListHistory(userId: number, listId: number) {
  const listHistory = await historyRepository.findFinishedListByListId(listId);

  return listHistory;
}

async function findItemHistory(userId: number, itemId: number) {
  const itemHistory = await historyRepository.findItemHistoryByItemId(userId, itemId);

  return itemHistory;
}

const historyService = {
  findAllListHistory,
  findListHistory,
  findItemHistory
};

export default historyService;