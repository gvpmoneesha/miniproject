import express from "express";
import {
  deleteUser,
  getAllDrivers,
  getAllOfficers,
  getUser,
  userUpdate,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getuser/:id", getUser);
router.put("/update/:id", userUpdate);
router.get("/getallofficers", getAllOfficers);
router.delete("/delete/:id", deleteUser);
router.get("/getalldrivers", getAllDrivers);

export default router;
