import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { unauthorizedError } from "@/Errors";
import { prisma } from "@/Configs";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.header("Authorization");
  if (!header) return unauthorizedResponse(res);

  const token = header.split(" ")[1];
  if (!token) return unauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTData;

    const session = await prisma.sessions.findFirst({
      where: {
        token,
      },
    });
    if (!session) return unauthorizedResponse(res);

    req.userId = userId;

    return next();
  } catch (err) {
    return unauthorizedResponse(res);
  }
}

function unauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTData;

type JWTData = {
  userId: number;
};
