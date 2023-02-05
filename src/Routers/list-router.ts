import { Router } from 'express';
import { listsGet, listNameGet, listPost, listPut, ListDelete } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listSchema, listIdSchema } from '@/Schemas';

const listRouter = Router();

listRouter
  .all("/*", authenticateToken)
  .get("/", listsGet)
  .get("/:listId", validateParams(listIdSchema), listNameGet)
  .post("/", validateBody(listSchema), listPost)
  .put("/:listId", validateParams(listIdSchema), validateBody(listSchema), listPut)
  .delete("/:listId", validateParams(listIdSchema), ListDelete)

export { listRouter };