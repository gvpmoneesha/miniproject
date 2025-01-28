import express from "express";
import {
  ruleCreate,
  getAllRule,
  getRule,
  violaionUpdate,
  deleteViolation,
} from "../controllers/violation.controller.js";

const router = express.Router();

router.post("/add", ruleCreate);
router.get("/getallrules", getAllRule);
router.get("/getrule/:_id", getRule);
router.put("/update/:_id", violaionUpdate);
router.delete("/delete/:_id", deleteViolation);

export default router;
