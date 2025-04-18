import express from "express";
import {
  createPalindrome,
  getPalindrome,
} from "../controllers/palindrome.controller.js";

const router = express.Router();

router.get("/", getPalindrome);
router.post("/", createPalindrome);

export default router;
