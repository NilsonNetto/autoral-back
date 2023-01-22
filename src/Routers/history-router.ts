import { Router } from 'express';
import { allListsHistoryGet, listHistoryGet, itemHistoryGet } from '@/Controllers';
import { authenticateToken, validateParams } from '@/Middlewares';
import { listIdSchema, itemIdSchema } from '@/Schemas';

const historyRouter = Router();

historyRouter
  .all("/*", authenticateToken)
  .get("/lists", allListsHistoryGet)
  .get("/list/:listId", validateParams(listIdSchema), listHistoryGet)
  .get("/item/:itemId",validateParams(itemIdSchema), itemHistoryGet)
  
export { historyRouter };