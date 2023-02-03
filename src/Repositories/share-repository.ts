import { prisma } from "@/Configs";
import { ShareRequests } from "@prisma/client";

async function findUserSharedLists(userId: number) {
  return prisma.shareRequests.findMany({
    where: {
      userId,
      accepted: true
    },
    select: {
      id: true,
      OwnerId :{
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      Lists: {
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

async function findUserOwnedLists(userId: number) {
  return prisma.shareRequests.findMany({
    where: {
      ownerId: userId
    },
    select: {
      id: true,
      pending: true,
      accepted: true,
      UserId: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      Lists: {
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}

async function findShareRequests(userId: number) {
  return prisma.shareRequests.findMany({
    where: {
      userId,
      pending: true
    },
    select:{
      id: true,
      Lists: {
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      },
      OwnerId: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
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

async function findShareRequestByUserIdAndListId(userId: number, listId: number) {
  return prisma.shareRequests.findFirst({
    where: {
      userId,
      listId
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


async function deleteShareRequest(id: number) {
  return prisma.shareRequests.delete({
    where: {
      id
    }
  })
}
export type shareRequestParams = Pick<ShareRequests, "listId" | "ownerId" | "userId">

const shareRepository = {
  findUserSharedLists,
  findUserOwnedLists,
  findShareRequests,
  createShareRequest,
  findShareRequestById,
  findShareRequestByUserIdAndListId,
  updateAcceptedRequest,
  updateRefusedRequest,
  deleteShareRequest
};

export default shareRepository;