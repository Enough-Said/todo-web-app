import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import api from "../lib/axios";
import Reminder from "../components/Reminder";
import RemindersNotFound from "../components/RemindersNotFound";
import { LoaderIcon } from "lucide-react";

function HomePage() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get todo list items from backend server
  useEffect(() => {
    const fetchRem = async () => {
      try {
        const res = await api.get("/reminders");
        setReminders(res.data);
      } catch (error) {
        console.log("Error fetching todo list");
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchRem();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-5"> 
        <h1 className="text-2xl font-bold text-secondary font-mono tracking-tight">Todo</h1>
          
        {reminders.filter(r => !r.completed).length === 0 && <RemindersNotFound />}

        {reminders.filter(r => !r.completed).length > 0 &&
          <div className="grid grid-cols-1">
            {reminders.filter(r => !r.completed).map((reminder) => (
              <Reminder key={reminder._id} reminder={reminder} setReminders={setReminders} />
            ))}
          </div>
        }
        
        <h1 className="text-2xl font-bold text-secondary font-mono tracking-tight pt-10">Completed</h1>
        <div className="grid grid-cols-1">
          {reminders.filter(r => r.completed).map((reminder) => (
            <Reminder key={reminder._id} reminder={reminder} setReminders={setReminders} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default HomePage;