import { Router } from 'express';
import { listLocalsGet, listLocalsPost, finishLocalPost, updateLocalName, listLocalDelete } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listIdSchema, listLocalIdSchema, localSchema } from '@/Schemas';

const localRouter = Router();

localRouter
  .all("/*", authenticateToken)
  .get("/:listId", validateParams(listIdSchema), listLocalsGet)
  .post("/:listId",validateParams(listIdSchema), validateBody(localSchema), listLocalsPost)
  .post("/finished/:listLocalId", validateParams(listLocalIdSchema), finishLocalPost)
  .put("/:listLocalId", validateParams(listLocalIdSchema), validateBody(localSchema), updateLocalName)
  .delete("/:listLocalId", validateParams(listLocalIdSchema), listLocalDelete)
  
export { localRouter };