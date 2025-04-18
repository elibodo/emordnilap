import express from "express";
import {
  createEmordnilap,
  getEmordnilap,
} from "../controllers/emordnilap.controller.js";

const router = express.Router();

router.get("/", getEmordnilap);
router.post("/", createEmordnilap);

export default router;
