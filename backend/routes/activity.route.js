// routes/activityRoutes.js
import express from "express";
import {
  addActivity,
  getRecentActivities,
  addActivityOfficer,
  getRecentActivitiesOfficer,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/add", addActivity);
router.get("/recent", getRecentActivities);
router.post("/addOfficer", addActivityOfficer);
router.get("/recentOfficer", getRecentActivitiesOfficer);

export default router;
