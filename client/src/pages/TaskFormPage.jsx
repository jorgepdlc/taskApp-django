/* eslint-disable react/prop-types */
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsArrowBarRight } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { useEffect, useState } from "react";
import { deleteTask, updateTask } from "../api/task.api";

export function TaskFormPage({ task, onTaskDeleted, onPageHide }) {
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleIconMouseEnter = () => {
    setIsHovered(true);
  };
  const handleIconMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    console.log("TaskFormPage desplegado");
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    const updateTaskData = async () => {
      try {
        await updateTask(task.id, {
          title: title,
          description: description,
          fav: task.fav,
          done: task.done,
        });
        console.log("Tarea actualizada exitosamente en la API");
      } catch (error) {
        console.error("Error al actualizar la tarea en la API:", error);
      }
    };

    updateTaskData();
  }, [title, description, task.id, task.fav, task.done]);

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
                  task.done = !task.done;
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
                  task && task.done
                    ? "text-neutral-400 line-through"
                    : "text-white"
                } focus:outline-none shadow-none`}
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)}}
              />
              <div className="flex items-center text-2xl cursor-pointer mr-2">
                {task.fav ? (
                  <AiFillStar
                    className="text-sky-400 text-xl mr-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      task.fav = !task.fav;
                    }}
                  />
                ) : (
                  <AiOutlineStar
                    className="text-sky-400 text-xl mr-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      task.fav = !task.fav;
                    }}
                  />
                )}
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
            value={description}
            onChange={(e) => {
                setDescription(e.target.value)}}
          ></textarea>
        </form>
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
