import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ReminderDetailPage from "./pages/ReminderDetailPage";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-radial-[at_50%_25%] from-black from-65% to-primary/40" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/reminders/:id" element={<ReminderDetailPage />} />
      </Routes>
    </div>
  );
};
export default App;
