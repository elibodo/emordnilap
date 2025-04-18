import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import emordnilapRoutes from "./routes/emordnilap.route.js";
import palindromeRoutes from "./routes/palindrome.route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/emordnilap", emordnilapRoutes);
app.use("/api/palindrome", palindromeRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server running on http://localhost:" + PORT);
});
