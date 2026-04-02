import express from "express";
import {
  createReminder,
  deleteReminder,
  updateReminder,
  getAllReminders,
  getReminderById,
} from "../controllers/reminderController.js";

const router = express.Router();

// router.get("/", getAllNotes);
// router.get("/:id", getNoteById);
// router.post("/", createNote);
// router.put("/:id", updateNote);
// router.delete("/:id", deleteNote);

router.post("/", createReminder);
router.delete("/:id", deleteReminder);
router.put("/:id", updateReminder);
router.get("/", getAllReminders);
router.get("/:id", getReminderById);

export default router;