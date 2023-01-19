import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


app.get("/status", (req, res) => res.send("OK!"))

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});