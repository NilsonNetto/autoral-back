import { Router } from 'express';
import {
  sharedListsGet,
  sharedOwnedListsGet,
  shareRequestGet,
  shareRequestPost,
  acceptRequestPost,
  refuseRequestPost,
  removeSharePost } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listIdSchema, userEmailSchema, requestIdSchema } from '@/Schemas';

const shareRouter = Router();

shareRouter
  .all("/*", authenticateToken)
  .get("/", sharedListsGet)
  .get("/owned", sharedOwnedListsGet)
  .get("/requests", shareRequestGet)
  .post("/:listId", validateParams(listIdSchema), validateBody(userEmailSchema), shareRequestPost)
  .post("/accept/:requestId", validateParams(requestIdSchema), acceptRequestPost) 
  .post("/refuse/:requestId", validateParams(requestIdSchema), refuseRequestPost)
  .post("/remove/:requestId", validateParams(requestIdSchema), removeSharePost) //rota para remover o compartilhamento com alguém(implementar)

export { shareRouter };