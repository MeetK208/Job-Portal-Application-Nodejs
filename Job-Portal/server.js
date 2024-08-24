// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import colors from "colors/index.js";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import eae from "express-async-errors";

import connectDB from "./config/dp_connect.js";

import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import searchJobRoutes from "./routes/searchJobRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import errorMiddelware from "./middelwares/errorMiddleware.js";
import userAuth from "./middelwares/authMiddleware.js";

dotenv.config(); // Config to add .env file // dotenv.config({path : './config'})

connectDB(); // MongoDB connection

const app = express(); // To create express Server

// Middelware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Get API
app.get("/", (req, res) => {
  res.send("<h1> Welcome to Job Portal Website 1.0 </h1>");
});

// Post API
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);
app.use("/api/v1/search", searchJobRoutes);

// Custom Middleware for validation
app.use(errorMiddelware);

const PORT = process.env.PORT || 8080; //Port No from Config File
const DEV_MODE = process.env.DEV_MODE || "Development"; // DEV_MODE from Config File

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Node Server Running in ${DEV_MODE} Mode on Port No ${PORT}`);
});
