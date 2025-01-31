import express from "express";
import {
  deleteUser,
  getAllDrivers,
  getAllOfficers,
  getUser,
  getOfficer,
  userUpdate,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getuser/:id", getUser);
router.get("/getofficer/:id", getOfficer);
router.put("/update/:id", userUpdate);
router.get("/getallofficers", getAllOfficers);
router.delete("/delete/:id", deleteUser);
router.get("/getalldrivers", getAllDrivers);

export default router;
