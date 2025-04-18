import mongoose from "mongoose";
import Emordnilap from "../models/emordnilap.model.js";

export const getEmordnilap = async (req, res) => {
  try {
    const emordnilap = await Emordnilap.find({});
    res.status(200).json({ success: true, data: emordnilap });
  } catch (error) {
    console.log("No emordnilaps found", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEmordnilap = async (req, res) => {
  const { word, wordDefinition, reverse, reverseDefinition } = req.body;

  if (!word || !wordDefinition || !reverse || !reverseDefinition) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all fields" });
  }

  if (word.toLowerCase() === reverse.toLowerCase()) {
    return res.status(400).json({
      success: false,
      message: "Word and its reverse cannot be the same (this is a palindrome)",
    });
  }

  try {
    const existing = await Emordnilap.findOne({
      $or: [
        { word: word.toLowerCase() },
        { reverse: word.toLowerCase() },
        { word: reverse.toLowerCase() },
        { reverse: reverse.toLowerCase() },
      ],
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Either the word or its reverse already exists in the database",
      });
    }

    const newEmordnilap = new Emordnilap({
      word: word.toLowerCase(),
      wordDefinition,
      reverse: reverse.toLowerCase(),
      reverseDefinition,
    });

    await newEmordnilap.save();

    res.status(201).json({ success: true, data: newEmordnilap });
  } catch (error) {
    console.error("Error in createEmordnilap", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
