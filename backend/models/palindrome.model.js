import mongoose from "mongoose";

const palindromeSchema = new mongoose.Schema({
  word: { type: String, required: true },
  wordDefinition: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Palindrome = mongoose.model("Palindrome", palindromeSchema);
export default Palindrome;
