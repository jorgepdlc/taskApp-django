import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { createTask, deleteTask, updateTask, getTask } from "../api/task.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const param = useParams();
  const [isHovered, setIsHovered] = useState(false);

  const handleIconMouseEnter = () => {
    setIsHovered(true);
  };

  const handleIconMouseLeave = () => {
    setIsHovered(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (param.id) {
      await updateTask(param.id, data);
      toast.success("Task updated", {
        position: "bottom-right",
        style: {
          backgroundColor: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("New task created", {
        position: "bottom-right",
        style: {
          backgroundColor: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function fetchTask() {
      const res = await getTask(param.id);
      setValue("title", res.data.title);
      setValue("description", res.data.description);
    }
    if (param.id) {
      fetchTask();
    }
  }, [param.id, setValue]);

  return (
    <div className="p-5">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1">
          <div className="flex rounded-t border-b border-b-neutral-600 bg-neutral-800 px-2 py-3 hover:bg-neutral-700">
            <div
              className="flex items-center text-3x1 cursor-pointer ml-2 mr-4"
              onMouseEnter={handleIconMouseEnter}
              onMouseLeave={handleIconMouseLeave}
            >
              {isHovered ? (
                <FiCheckCircle className="text-sky-400" />
              ) : (
                <FiCircle className="text-sky-400" />
              )}
            </div>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="bg-transparent border-none ml-1 mr-2 w-full font-bold text-white
            focus:outline-none shadow-none"
            />
            <div className="flex items-center text-2xl cursor-pointer mr-2">
              <AiOutlineStar className="text-sky-400" />
            </div>
          </div>
          <div className="flex rounded-b bg-neutral-800 px-2 py-3 hover:bg-neutral-700">
            <div className="flex items-center cursor-pointer ml-1 mr-3">
              <MdAdd className="text-sky-400 text-2xl" />
            </div>
            <input
              type="text"
              placeholder="Agregar Paso"
              {...register("title", { required: false })}
              className="bg-transparent border-none ml-1 mr-2 w-full text-white
                text-sm focus:outline-none shadow-none placeholder:text-sky-400"
            />
          </div>
        </div>
        <textarea
          rows="3"
          placeholder="Agregar Nota"
          {...register("description", { required: true })}
          className="rounded w-full bg-neutral-800 px-3 py-3 mt-2 text-sm
          hover:border hover:border-neutral-600 focus:outline-none shadow-none"
        ></textarea>
        <button
          className="button bg-indigo-500 p-3 rounded-lg block w-full mt-6"
          type="submit"
        >
          Save
        </button>
      </form>
      {param.id && (
        <div className="flex justify-end">
          <button
            onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deleteTask(param.id);
                toast.success("Task deleted", {
                  position: "bottom-right",
                  style: {
                    backgroundColor: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/tasks");
              }
            }}
            className="button bg-red-500 p-3 rounded-lg block w-48 mt-3"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
