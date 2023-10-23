import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import allRoutes from "./routes/post.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", allRoutes);

app.use((err, _, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message, stack: err.stack });
});

mongoose.connect(process.env.MONGODB).catch((err) => {
  console.error(`Error during initial connection to MongoDB: ${err}`);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Disconnecting from MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
