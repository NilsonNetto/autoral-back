import { Router } from 'express';
import { allListsHistoryGet, listHistoryGet, itemHistoryGet } from '@/Controllers';
import { authenticateToken, validateParams } from '@/Middlewares';
import { listIdSchema, itemIdSchema } from '@/Schemas';

const historyRouter = Router();

historyRouter
  .all("/*", authenticateToken)
  .get("/", allListsHistoryGet) //rota para pegar as ultimas 5 listas com finished true
  .get("/list/:listId", validateParams(listIdSchema), listHistoryGet) //rota para pegar uma lista inteira
  .get("/item/:itemId",validateParams(itemIdSchema), itemHistoryGet) //rota para pegar quando um item foi comprado pelo nome do item
  
export { historyRouter };