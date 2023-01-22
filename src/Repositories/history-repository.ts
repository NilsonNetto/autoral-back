import { prisma } from "@/Configs";
import { listStatus } from "@prisma/client";

async function findAllFinishedList(userId: number) {
  return prisma.usersLists.findMany({
    where:{
      userId,
      shared: true 
    }
  })
  //aqui falta filtrar se a lista foi terminada ou não
}

async function findFinishedListByListId(listId: number) {
  return prisma.lists.findFirst({
    where: {
      id: listId,
      status: listStatus.finished
    }, include: {
      listsLocals: {
        include: {
          locals: true,
          listLocalsItems: {
            include: {
              items: true
            }
          }
        }
      }
    } 
  })
}

async function findItemHistoryByItemId(userId:number, itemId:number) {
  return prisma.listsLocalsItems.findMany({
    where:{
      itemId
    },
    include:{
      items: true,
      listsLocals: {
        include: {
          lists: {
            include: {
              usersLists: {
                where: {
                  userId
                }
              }
            }
          }
        }
      }
    }
  })
  //aqui falta filtrar se a lista foi terminada ou não
}

const historyRepository = {
  findAllFinishedList,
  findFinishedListByListId,
  findItemHistoryByItemId
};

export default historyRepository;