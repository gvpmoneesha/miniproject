import express from "express";
import { ruleCreate, getAllRule } from "../controllers/violation.controller.js";

const router = express.Router();

router.post("/add", ruleCreate);
router.get("/getallrules", getAllRule);

export default router;
