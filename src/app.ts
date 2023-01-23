import express from "express";
import cors from "cors";

import { loadEnv } from "./Configs";
import {
  authenticationRouter,
  listRouter,
  localRouter,
  itemRouter,
  shareRouter,
  historyRouter,
  profileRouter
} from "@/Routers"

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/status", (req, res) => res.send("OK! Server is up"))
  .use("/auth", authenticationRouter)
  .use("/list", listRouter)
  .use("/local", localRouter)
  .use("/item", itemRouter)
  .use("/share", shareRouter)
  .use("/history", historyRouter)
  .use("/profile", profileRouter)

const port = +process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});