import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGOURL, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// npm i bcryptjs dotenv mongoose
// npm i flowbite-react react-router-dom

//handle middleware errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
