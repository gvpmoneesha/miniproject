import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import fineRoutes from "./routes/fine.route.js";
import messageRoutes from "./routes/message.route.js";
import violatioRoute from "./routes/violation.route.js";
import complainRoutes from "./routes/complain.route.js";

import { app, server } from "./socket/socket.js";
import cron from "node-cron";
import { checkFinesAndSendEmails } from "./controllers/email.controller.js";
import payRoutes from "./routes/payment.route.js";
import { updateBlockedFines } from "./controllers/email.controller.js";
import { checkFinesAndSendReminder } from "./controllers/email.controller.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Failed!", error);
    process.exit(1);
  }
};

connectDB();

//cron.schedule("*/1 * * * *", async () => {
// console.log("Running cron job every 1 minutes...");
//await checkFinesAndSendEmails();
//await updateBlockedFines();
//await checkFinesAndSendReminder();
//});

//const app = express();

app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);
app.use("/api/v1/fine", fineRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/violation", violatioRoute);
app.use("/api/pay", payRoutes);
app.use("/api/v1/complain", complainRoutes);

server.listen(3000, () => {
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
