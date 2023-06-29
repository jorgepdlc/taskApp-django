import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskPage } from "./pages/TasksPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid mx-auto bg-zinc-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;