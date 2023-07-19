import { useState, useEffect } from "react";
import { TaskList } from "../components/TaskList";
import { Toolbar } from "../components/Toolbar";
import { TaskFormPage } from "./TaskFormPage";
import { getTasks } from "../api/task.api";

export function TaskPage() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const handlePageHide = () => {
    setSelectedTask(null);
  };

  const handleSortAlphabetically = () => {
    setSortOption("alphabetically");
  };

  const handleSortByCreationDate = () => {
    setSortOption("creationDate");
  };

  const handleSortByImportance = () => {
    setSortOption("importance");
  };

  useEffect(() => {
    async function fetchTasks() {
      const res = await getTasks();
      setTasks(res.data);
    }
    fetchTasks();
  }, [tasks]);

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  return (
    <div className="flex select-none">
      <div className="flex-1">
        <Toolbar
          onSortAlphabetically={handleSortAlphabetically}
          onSortByCreationDate={handleSortByCreationDate}
          onSortByImportance={handleSortByImportance}
        />
        <TaskList tasks={tasks} setSelectedTask={setSelectedTask} sortOption={sortOption} />
      </div>
      {selectedTask && (
        <div className="w-96 bg-neutral-900 sticky top-0">
          <TaskFormPage task={selectedTask}
          onTaskDeleted={handleTaskDeleted}
          onPageHide={handlePageHide} />
        </div>
      )}
    </div>
  )
}
