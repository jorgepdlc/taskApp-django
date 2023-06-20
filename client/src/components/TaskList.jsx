import { useEffect, useState } from "react";
import { getTasks } from "../api/task.api";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchTasks() {
      const res = await getTasks();
      setTasks(res.data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}