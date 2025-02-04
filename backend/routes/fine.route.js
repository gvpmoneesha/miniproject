import express from "express";
import {
  fineIssue,
  fineUpdate,
  getAllFines,
  getBlockFine,
  getBlockFines,
  getFine,
  getFineByOid,
} from "../controllers/fine.controller.js";

const router = express.Router();

router.post("/fineissue", fineIssue);
router.get("/getallfine", getAllFines);
router.get("/getfine/:dId", getFine);
router.get("/getfinebyobjectid/:_id", getFineByOid);
router.get("/getblockfines", getBlockFines);
router.put("/updateblockfines/:_id", fineUpdate);
router.get("/getblockfine/:_id", getBlockFine);

export default router;
