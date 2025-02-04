import express from "express";
import { complainCreate } from "../controllers/complain.controller.js";

const router = express.Router();

router.post("/complainadd", complainCreate);

export default router;
