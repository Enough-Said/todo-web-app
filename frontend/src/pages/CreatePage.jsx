import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reminders", {
        title,
        description: content,
        dueDate: dueDate || null,
        completed: false
      });

      toast.success("Reminder created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating reminder", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating reminders too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create reminder");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>

          <div className="card bg-base-100 border border-solid border-primary">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Reminder</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label w-full">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label w-full">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    placeholder="Write your reminder here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label w-full">
                    <span className="label-text">Due Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-between">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;