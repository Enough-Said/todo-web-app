import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const RemindersNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-2 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-secondary" />
      </div>
      <h3 className="text-2xl font-bold">No items</h3>
      <p className="text-base-content/70">
        Nothing to do for now...
      </p>
      <Link to="/create" className="btn btn-primary">
        Create a New Reminder
      </Link>
    </div>
  );
};
export default RemindersNotFound;