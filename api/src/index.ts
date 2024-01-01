// ./src/index.ts
import express from "express";
import mongoose from "mongoose";
import router from "./routers/user.router";
const app = express();

import dotenv from "dotenv";
dotenv.config();

// Ahora puedes acceder a las variables de entorno con process.env
const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI as string;
mongoose
  .connect(mongoUri, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (_req, res) => {
  res.send("API Rest Info");
});

app.use("/users", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
