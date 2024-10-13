import express from "express";
import { getUser, userUpdate } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getuser/:id", getUser);
router.put("/update/:id", userUpdate);

export default router;
