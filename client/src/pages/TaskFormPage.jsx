/* eslint-disable react/prop-types */
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { BsArrowBarRight } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { useEffect, useState } from "react";
import { deleteTask } from "../api/task.api";

export function TaskFormPage({ task, onTaskDeleted, onPageHide, onTaskDone }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleIconMouseEnter = () => {
    setIsHovered(true);
  };
  const handleIconMouseLeave = () => {
    setIsHovered(false);
  };
  const handleTaskDone = () => {
    onTaskDone(task);
  };

  useEffect(() => {
    console.log("TaskFormPage desplegado");
  }, [task]);

  return (
    <div className="p-5 h-[calc(100vh-48px)]">
      <div className="max-h-[calc(100vh-135px)] min-h-[calc(100vh-135px)]">
        <form>
          <div className="grid grid-cols-1">
            <div className="flex rounded-t border-b border-b-neutral-600 bg-neutral-800 px-2 py-3 hover:bg-neutral-700">
              <div
                className="flex items-center text-3x1 cursor-pointer ml-2 mr-4"
                onMouseEnter={handleIconMouseEnter}
                onMouseLeave={handleIconMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskDone();
                }}
              >
                {isHovered || task.done ? (
                  <FiCheckCircle className="text-sky-400" />
                ) : (
                  <FiCircle className="text-sky-400" />
                )}
              </div>
              <input
                type="text"
                placeholder="Title"
                className={`bg-transparent border-none ml-1 mr-2 w-full font-bold ${
                  task && task.done ? "text-sky-400" : "text-white"
                } focus:outline-none shadow-none`}
                defaultValue={task ? task.title : ""}
              />
              <div className="flex items-center text-2xl cursor-pointer mr-2">
                <AiOutlineStar className="text-sky-400" />
              </div>
            </div>
            <div className="flex rounded-b bg-neutral-800 px-2 py-3">
              <div className="flex items-center cursor-pointer ml-1 mr-3">
                <MdAdd className="text-sky-400 text-2xl" />
              </div>
              <input
                type="text"
                placeholder="Agregar Paso"
                className="bg-transparent border-none ml-1 mr-2 w-full text-white
                text-sm focus:outline-none shadow-none placeholder:text-sky-400"
              />
            </div>
          </div>
          <textarea
            rows="3"
            placeholder="Agregar Nota"
            className="rounded w-full max-h-44 bg-neutral-800 px-3 py-3 mt-2 text-sm
          hover:border hover:border-neutral-600 focus:outline-none shadow-none"
            defaultValue={task ? task.description : ""}
          ></textarea>
        </form>
        <button>Save</button>
      </div>

      <div className="flex items-center border-t border-t-neutral-500 h-14 justify-between">
        <BsArrowBarRight
          className="p-1 text-3xl rounded hover:bg-neutral-800 cursor-pointer ml-1"
          onClick={onPageHide}
        />
        <div className="text-xs text-neutral-400">Creado el {task.id}</div>
        <GoTrash
          onClick={async () => {
            const accepted = window.confirm("Are you sure?");
            if (accepted) {
              await deleteTask(task.id);
              onTaskDeleted(task.id);
            }
          }}
          className="p-1 text-3xl rounded hover:bg-neutral-800 cursor-pointer ml-1"
        />
      </div>
    </div>
  );
}
