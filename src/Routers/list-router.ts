import { Router } from 'express';
import { listsGet, listNameGet, listPost, finishListPost, ListDelete } from '@/Controllers';
import { authenticateToken, validateBody, validateParams } from '@/Middlewares';
import { listSchema, listIdSchema } from '@/Schemas';

const listRouter = Router();

listRouter
  .all("/*", authenticateToken)
  .get("/", listsGet)
  .get("/:listId", validateParams(listIdSchema), listNameGet)
  .post("/", validateBody(listSchema), listPost)
  .post("/finish/:listId", validateParams(listIdSchema), finishListPost)
  .delete("/delete/:listId", validateParams(listIdSchema), ListDelete)

export { listRouter };