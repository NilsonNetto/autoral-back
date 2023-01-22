import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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

app.use(express.json());
app.use(cors());

app
  .get("/status", (req, res) => res.send("OK! Server is up"))
  .use("/auth", authenticationRouter)
  .use("/list", listRouter)
  .use("/local", localRouter)
  .use("/item", itemRouter)
  .use("/share", shareRouter)
  .use("/history", historyRouter)
  .use("/profile", profileRouter)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});