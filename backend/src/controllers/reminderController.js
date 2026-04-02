import Reminder from "../models/Reminder.js";

export async function createReminder(req, res) {
    try {
        const { title, description, dueDate } = req.body;
        const reminder = new Reminder({ title, description, dueDate, completed: false });

        const savedReminder = await reminder.save();
        res.status(201).json(savedReminder);
    } catch (error) {
        console.error("Error in createReminder controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteReminder(req, res) {
    try {
        const reminder = await Reminder.findByIdAndDelete(req.params.id);
        if (!reminder) return res.status(404).json({ message: "Reminder not found!" });
        res.json({ message: "Reminder deleted successfully" });
    } catch (error) {
        console.error("Error in deleteReminder controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateReminder(req, res) {
    try {
        const { title, description, dueDate, completed } = req.body;
        const reminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            { title, description, dueDate, completed },
            { new: true }
        );
        if (!reminder) return res.status(404).json({ message: "Reminder not found!" });
        res.json(reminder);
    } catch (error) {
        console.error("Error in updateReminder controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllReminders(req, res) {
    try {
        const reminders = await Reminder.find().sort({ dueDate: -1, createdAt: -1 });
        res.status(200).json(reminders);
    } catch (error) {
        console.error("Error in getAllReminders controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllCompletedReminders(req, res) {
    try {
        const reminders = await Reminder.find({ completed: true }).sort({ dueDate: -1, createdAt: -1 });
        res.status(200).json(reminders);
    } catch (error) {
        console.error("Error in getAllCompletedReminders controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getReminderById(req, res) {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) return res.status(404).json({ message: "Reminder not found!" });
        res.json(reminder);
    } catch (error) {
        console.error("Error in getReminderById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
