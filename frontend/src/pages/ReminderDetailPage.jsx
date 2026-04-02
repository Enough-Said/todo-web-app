import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const ReminderDetailPage = () => {
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const res = await api.get(`/reminders/${id}`);
        setReminder(res.data);
      } catch (error) {
        console.log("Error in fetching reminder", error);
        toast.error("Failed to fetch the reminder");
      } finally {
        setLoading(false);
      }
    };

    fetchReminder();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this reminder?")) return;

    try {
      await api.delete(`/reminders/${id}`);
      toast.success("Reminder deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the reminder:", error);
      toast.error("Failed to delete reminder");
    }
  };

  const handleSave = async () => {
    if (!reminder.title.trim() || !reminder.description.trim()) {
      toast.error("Please add a title or description");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/reminders/${id}`, reminder);
      toast.success("Reminder updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the reminder:", error);
      toast.error("Failed to update reminder");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Reminders
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Reminder
            </button>
          </div>

          <div className="card bg-base-100 border border-solid border-[#00FF9D]">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label w-full">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full"
                  value={reminder.title}
                  onChange={(e) => setReminder({ ...reminder, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label w-full">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Write your reminder here..."
                  className="textarea textarea-bordered h-32 w-full"
                  value={reminder.description}
                  onChange={(e) => setReminder({ ...reminder, description: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label w-full">
                  <span className="label-text">Due Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={reminder.dueDate ? reminder.dueDate.split('T')[0] : ''}
                  onChange={(e) => setReminder({ ...reminder, dueDate: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReminderDetailPage;