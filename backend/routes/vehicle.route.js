import express from "express";
import { vehicleCreate } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/create", vehicleCreate);

export default router;
