import { Router } from 'express';
import { registerPost, loginPost } from '@/Controllers';
import { validateBody } from '@/Middlewares';
import { loginSchema, registerSchema } from '@/Schemas';

const authenticationRouter = Router();

authenticationRouter
  .post("/register", validateBody(registerSchema), registerPost)
  .post("/login", validateBody(loginSchema), loginPost);

export { authenticationRouter };