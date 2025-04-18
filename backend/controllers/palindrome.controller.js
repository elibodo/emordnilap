import mongoose from "mongoose";
import Palindrome from "../models/palindrome.model.js";

export const getPalindrome = async (req, res) => {
  try {
    const palindrome = await Palindrome.find({});
    res.status(200).json({ success: true, data: palindrome });
  } catch (error) {
    console.log("No palindromes found", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPalindrome = async (req, res) => {
  const { word, wordDefinition } = req.body;

  if (!word || !wordDefinition) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all fields" });
  }

  const normalizedWord = word.trim().toLowerCase();
  const reversed = normalizedWord.split("").reverse().join("");
  if (normalizedWord !== reversed) {
    return res
      .status(400)
      .json({ success: false, message: "Word is not a palindrome" });
  }

  try {
    const existing = await Palindrome.findOne({ word: normalizedWord });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Palindrome already exists" });
    }

    const newPalindrome = new Palindrome({
      word: normalizedWord,
      wordDefinition,
    });

    await newPalindrome.save();
    res.status(201).json({ success: true, data: newPalindrome });
  } catch (error) {
    console.error("Error in Create palindrome", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
