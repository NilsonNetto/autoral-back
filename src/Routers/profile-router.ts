import { Router } from 'express';
import { userProfileGet, userProfilePut } from '@/Controllers';
import { authenticateToken, validateBody } from '@/Middlewares';
import { registerSchema } from '@/Schemas';

const profileRouter = Router();

profileRouter
  .all("/*", authenticateToken)
  .get("/", userProfileGet)
  .put("/", validateBody(registerSchema), userProfilePut)
  
export { profileRouter };