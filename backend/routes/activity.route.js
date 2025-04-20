// routes/activityRoutes.js
import express from "express";
import {
  addActivity,
  getRecentActivities,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/add", addActivity);
router.get("/recent", getRecentActivities);

export default router;
