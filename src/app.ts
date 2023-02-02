import express, {Express} from "express";
import cors from "cors";

import { connectDb, loadEnv } from "@/Configs";

loadEnv();

import {
  authenticationRouter,
  listRouter,
  localRouter,
  itemRouter,
  shareRouter,
  historyRouter,
  profileRouter
} from "@/Routers"

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/serverStatus", (req, res) => res.send("OK! Server is up"))
  .use("/auth", authenticationRouter)
  .use("/list", listRouter)
  .use("/local", localRouter)
  .use("/item", itemRouter)
  .use("/share", shareRouter)
  .use("/history", historyRouter)
  .use("/profile", profileRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export default app;