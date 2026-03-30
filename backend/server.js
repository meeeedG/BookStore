import express from "express";
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/books", router);
app.use("/api/categories", categoryRouter);


try {
  await mongoose.connect(process.env.DB_URI);
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
} catch (error) {
  console.error("Failed to connect to MongoDB", error);
}
