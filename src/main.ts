import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import BaseRouter from "./routes";
import { initPassport } from "./passport";
import { session } from "passport";

const prisma = new PrismaClient();
// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

initPassport(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", BaseRouter);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
