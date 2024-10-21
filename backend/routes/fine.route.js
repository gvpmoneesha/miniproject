import express from "express";
import { fineIssue } from "../controllers/fine.controller.js";

const router = express.Router();

router.post("/fineissue", fineIssue);

export default router;
