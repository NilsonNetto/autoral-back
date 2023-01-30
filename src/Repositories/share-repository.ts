import { prisma } from "@/Configs";
import { LocalsName, ShareRequests } from "@prisma/client";

async function findUserLists(userId: number) {
  return prisma.shareRequests.findMany({
    where: {
      userId
    },
    include: {
      Lists: true
    }
  })
}

async function findUserOwnedLists(userId: number) {
  return prisma.shareRequests.findMany({
    where: {
      ownerId: userId
    },
    include: {
      Lists: true
    }
  })
}

async function createShareRequest(data: shareRequestParams) {
  return prisma.shareRequests.create({
    data
  })
}

async function findShareRequestById(id: number) {
  return prisma.shareRequests.findFirst({
    where:{
      id
    }
  })
}

async function updateAcceptedRequest(id: number) {
  return prisma.shareRequests.update({
    where:{
      id
    },
    data: {
      pending: false,
      accepted: true
    }
  })
}

async function updateRefusedRequest(id: number) {
  return prisma.shareRequests.update({
    where:{
      id
    },
    data: {
      pending: false,
      accepted: false
    }
  })
}

export type shareRequestParams = Pick<ShareRequests, "listId" | "ownerId" | "userId">

const shareRepository = {
  findUserLists,
  findUserOwnedLists,
  createShareRequest,
  findShareRequestById,
  updateAcceptedRequest,
  updateRefusedRequest
};

export default shareRepository;