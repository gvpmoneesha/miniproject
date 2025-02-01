import express from "express";
import {
  getAllDrivers,
  getAllOfficers,
  getUser,
  getOfficer,
  userUpdate,
  deleteDriver,
  deleteOfficer,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getuser/:id", getUser);
router.get("/getofficer/:id", getOfficer);
router.put("/update/:id", userUpdate);
router.get("/getallofficers", getAllOfficers);
router.delete("/delete-officer/:id", deleteOfficer);
router.delete("/delete-driver/:id", deleteDriver);
router.get("/getalldrivers", getAllDrivers);

export default router;
