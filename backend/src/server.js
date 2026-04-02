import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import reminderRoutes from "./routes/reminderRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// If development copy we need to use cors as frontend has a different domain name
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}

app.use(express.json());
app.use("/api/reminders", reminderRoutes);

// For deployment, add frontend as static object to deploy front- and backend together
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect database before starting app to ensure that database is up when website is running
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});