import mongoose from "mongoose";

const emordnilapSchema = new mongoose.Schema({
  word: { type: String, required: true },
  wordDefinition: { type: String, required: true },
  reverse: { type: String, required: true },
  reverseDefinition: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Emordnilap = mongoose.model("Emordnilap", emordnilapSchema);
export default Emordnilap;
