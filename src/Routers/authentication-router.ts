import { Router } from 'express';
import { signInPost, loginPost } from '@/Controllers';

const authenticationRouter = Router();

authenticationRouter
  .post("/sign-in", signInPost)
  .post("/login", loginPost)

export { authenticationRouter };