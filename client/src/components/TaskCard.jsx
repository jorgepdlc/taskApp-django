/* eslint-disable react/prop-types */

//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

export function TaskCard({ task, onCardClick, isSelected, onTaskDone }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleIconMouseEnter = () => {
    setIsHovered(true);
  };

  const handleIconMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    onCardClick(task);
  };

  const handleTaskDone = () => {
    onTaskDone(task);
  };

  return (
    <div
      className={`flex items-center justify-between rounded px-2 py-3 ${
        isSelected ? "bg-neutral-600" : "bg-neutral-800 hover:bg-neutral-700"
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-center text-3x1 ml-2 mr-4">
        <div
          className="mr-5 cursor-pointer"
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
        <h1 className={`${ task && task.done ? 
          "text-neutral-400 line-through" : "text-white"
          }`}
        >{task.title}</h1>
      </div>
      <AiOutlineStar className="text-sky-400 text-xl mr-1 cursor-pointer" />
    </div>
  );
}
