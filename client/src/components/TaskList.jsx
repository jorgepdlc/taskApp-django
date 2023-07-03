/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TaskCard } from "./TaskCard";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { createTask, updateTask } from "../api/task.api";

export function TaskList({ tasks, setSelectedTask }) {
  const [showAdditionalDiv, setShowAdditionalContent] = useState(false);
  const [isTaskListVisible, setTaskListVisibility] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);
  const ref = useRef(null);
  const [taskInput, setTaskInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [animationParent] = useAutoAnimate()
  
  

  const handleTaskCardClick = (task) => {
    setSelectedTaskId(task.id);
    setSelectedTask(task);

  };

  const handleAddButtonClick = () => {
    ref.current.focus();
  };

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleTaskDone = async (task) => {
    try {
      await updateTask(task.id, {
        title: task.title,
        fav: task.fav,
        done: !task.done,
        description: task.description,
      });
      console.log("Tarea actualizada exitosamente en la API");
    } catch (error) {
      console.error("Error al actualizar la tarea en la API:", error);
    }
  };

  const handleTaskFav = async (task) => {
    try {
      await updateTask(task.id, {
        title: task.title,
        fav: !task.fav,
        done: task.done,
        description: task.description,
      });
      console.log("Tarea actualizada exitosamente en la API");
    } catch (error) {
      console.error("Error al actualizar la tarea en la API:", error);
    }
  };

  const handleAddTaskClick = () => {
    setShowAdditionalContent(true);
    if (taskInput.trim() !== "") {
      showAdditionalDiv((prevValue) => !prevValue);
    }
  };

  const handleAddTaskDone = async () => {
    if (taskInput.trim() !== "") {
      try {
        await createTask({ title: taskInput }); // Llama a la función createTask
        console.log("Tarea creada exitosamente en la API");
        setTaskInput("");
        setShowAdditionalContent(false);
      } catch (error) {
        console.error("Error al crear la tarea en la API:", error);
      }
    }
  };

  const handleToggleTaskList = () => {
    setTaskListVisibility(!isTaskListVisible);
  };

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => task.done);
    setCompletedTasks(filteredTasks);
  }, [tasks]);

  return (
    <div>
      <div className="flex px-8 mb-2 text-sm">
        <div className="w-full h-full pt-3 bg-neutral-800 rounded text-sky-400">
          <div className="flex items-center w-full pb-3">
            <IoIosAdd
              className="cursor-pointer stroke-sky-400 ml-2 text-3xl"
              onClick={handleAddButtonClick}
            />
            <input
              className="bg-transparent border-none ml-1 mr-2 w-full text-white placeholder:text-sky-400
                focus:outline-none shadow-none focus:placeholder:text-white"
              ref={ref}
              onClick={handleAddTaskClick}
              onChange={handleTaskInputChange}
              type="text"
              placeholder="Agregar una tarea"
              value={taskInput}
            />
          </div>

          <div className="">
            {showAdditionalDiv && (
              <div className="flex justify-between px-4 bg-zinc-900 rounded-b border-t border-t-gray-400 py-2">
                <div className="flex items-center"></div>
                <button
                  className={`border border-zinc-500 p-1 text-sm ${
                    taskInput.trim() !== ""
                      ? "text-sky-400"
                      : "text-zinc-500 cursor-not-allowed"
                  }`}
                  disabled={taskInput.trim() === ""}
                  onClick={handleAddTaskDone}
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 px-8"
      ref={animationParent}>
        {tasks
          .filter((task) => !task.done)
          .sort((a, b) => (b.fav ? 1 : -1))
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTaskId === task.id}
              onCardClick={handleTaskCardClick}
              onTaskDone={handleTaskDone}
              onTaskFav={handleTaskFav}
            />
          ))}
      </div>
      {completedTasks.length > 0 && (
        <div className="grid grid-cols-1 gap-2 px-8">
          <div
            className="flex items-center border-b border-b-neutral-500 p-3 text-sm text-white cursor-pointer"
            onClick={handleToggleTaskList}
          >
            {isTaskListVisible ? (
              <IoIosArrowDown className="mr-2" />
            ) : (
              <IoIosArrowForward className="mr-2" />
            )}
            <h1 className="text-base">Completado {completedTasks.length}</h1>
          </div>

          {isTaskListVisible &&
            completedTasks
              .sort((a, b) => (b.fav ? 1 : -1))
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isSelected={selectedTaskId === task.id}
                  onCardClick={handleTaskCardClick}
                  onTaskDone={handleTaskDone}
                  onTaskFav={handleTaskFav}
                />
            ))}
        </div>
      )}
    </div>
  );
}
