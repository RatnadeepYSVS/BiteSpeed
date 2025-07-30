import express from "express";
import { create } from "../controllers/controller.js";
const router = express.Router()
router.post("/identify",create)
export default router