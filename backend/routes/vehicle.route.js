import express from "express";
import {
  vehicleCreate,
  getVehicle,
  vehicleUpdate,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/create", vehicleCreate);
router.get("/getvehicle/:cNumber", getVehicle);
router.put("/updatevehicle/:cNumber", vehicleUpdate);

export default router;
