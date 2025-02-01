import express from "express";
import {
  fineIssue,
  getAllFines,
  getFine,
} from "../controllers/fine.controller.js";

const router = express.Router();

router.post("/fineissue", fineIssue);
router.get("/getallfine", getAllFines);
router.get("/getfine/:dId", getFine);

export default router;
