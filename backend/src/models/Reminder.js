import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;