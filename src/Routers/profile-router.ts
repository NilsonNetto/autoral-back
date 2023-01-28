import { Router } from 'express';
import { userProfileGet, userProfilePut, userPicutrePut } from '@/Controllers';
import { authenticateToken, validateBody } from '@/Middlewares';
import { registerSchema, pictureSchema } from '@/Schemas';

const profileRouter = Router();

profileRouter
  .all("/*", authenticateToken)
  .get("/", userProfileGet)
  .put("/", validateBody(registerSchema), userProfilePut)
  .put("/picture", validateBody(pictureSchema), userPicutrePut)
  
export { profileRouter };