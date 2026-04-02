import { CheckCircle2Icon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/formatDate";
import api from "../lib/axios";
import toast from "react-hot-toast";

const Reminder = ({ reminder, setReminders }) => {
  // Function that is called when a reminder is deleted
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this reminder?")) return;

    try {
      await api.delete(`/reminders/${id}`);
      setReminders((prev) => prev.filter((item) => item._id !== id));
      toast.success("Reminder deleted successfully");
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete reminder");
    }
  };

  // Function that is called when an item is marked complete
  const handleComplete = async (e, id) => {
    e.preventDefault();

    if (reminder.completed) {
      toast("Reminder is already completed");
      return;
    }

    try {
      const updatedReminder = { ...reminder, completed: true };
      setReminders((prev) =>
        prev.map((item) => (item._id === id ? updatedReminder : item))
      );
      await api.put(`/reminders/${id}`, updatedReminder);
      toast.success("Reminder marked as completed");
    } catch (error) {
      console.error("Error in handleComplete", error);
      toast.error("Failed to mark reminder completed");
    }
  };

  // Function called when item is marked incomplete
  const handleIncomplete = async (e, id) => {
    e.preventDefault();

    if (!reminder.completed) {
      toast("Reminder is already not completed");
      return;
    }

    try {
      const updatedReminder = { ...reminder, completed: false };
      setReminders((prev) =>
        prev.map((item) => (item._id === id ? updatedReminder : item))
      );
      await api.put(`/reminders/${id}`, updatedReminder);
      toast.success("Reminder marked as incomplete");
    } catch (error) {
      console.error("Error in handleIncomplete", error);
      toast.error("Failed to mark reminder incomplete");
    }
  };

  const descriptionPreview = reminder.description
    ? reminder.description.length > 110
      ? `${reminder.description.slice(0, 110).trim()}...`
      : reminder.description
    : "No description";

  const dueDateText = reminder.dueDate
    ? formatDate(new Date(reminder.dueDate))
    : "No due date";

  return (
    <div className="w-full py-1">
      <Link to={`/reminders/${reminder._id}`} className={`card w-full bg-base-100 shadow-sm border border-base-300 ${
        reminder.completed ? "opacity-70" : ""}`}
      >
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3
                className={`card-title text-base-content ${
                  reminder.completed ? "line-through" : ""
                }`}
              >
                {reminder.title}
              </h3>
              <p className="text-base-content/70 text-sm mt-1 line-clamp-2">
                {descriptionPreview}
              </p>
              <p className="text-xs text-base-content/60 mt-2">
                Due: {dueDateText}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {reminder.completed && <button 
                className="btn btn-sm btn-outline"
                onClick={(e) => {handleIncomplete(e, reminder._id)}}
              >
                Mark Not Completed
              </button>}

              <button
                className={`btn btn-sm btn-outline ${
                  reminder.completed ? "btn-disabled" : "btn-success"
                }`}
                onClick={(e) => handleComplete(e, reminder._id)}
                disabled={reminder.completed}
              >
                <CheckCircle2Icon className="size-4 mr-1" />
                {reminder.completed ? "Completed" : "Complete"}
              </button>

              <button
                className="btn btn-sm btn-error"
                onClick={(e) => handleDelete(e, reminder._id)}
              >
                <Trash2Icon className="size-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Reminder;