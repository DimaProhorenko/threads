import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/connectDB.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connection.once("open", () => {
  app.listen(5000, () => {
    console.log("Server");
  });
});

mongoose.connection.on("error", (e) => {
  console.log(e);
});
