import { AiOutlineMenu, AiOutlineSortAscending, AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

export function Toolbar() {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString("es-ES", options);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortAlphabetically = () => {
    
  };

  const handleSortByCreationDate = () => {
    
  };

  const handleSortByImportance = () => {
    
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <div className="w-full h-24 p-4">
      <div className="flex justify-between h-10">
        <div className="flex items-center">
          <AiOutlineMenu className="mr-2 ml-2 text-lg cursor-pointer" />
          <h1 className="font-semibold text-xl cursor-default text-sky-400">Tareas</h1>
        </div>
        <div className="flex items-center relative">
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleDropdownToggle();
            }}
            className="flex items-center text-sky-400 h-auto hover:bg-neutral-800 rounded py-1 px-3"
          >
            <HiOutlineSwitchVertical className="mr-1 text-xl" />
            <h1 className="font-light">Ordenar</h1>
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-10 bg-neutral-800 text-white text-sm rounded top-10 right-0 min-w-max"
            >
              <div>
                <h1 className="block px-6 py-3 text-center font-bold 
                text-sm text-white border-b border-neutral-600 w-full">Ordenar por</h1>
              </div>
              <button
                className="block px-3 py-2 hover:bg-neutral-700 w-full"
                onClick={handleSortAlphabetically}
              >
                <div className="flex">
                  <AiOutlineSortAscending className="mr-4 text-xl" />
                  Alfabéticamente
                </div>
                
              </button>
              <button
                className="block px-3 py-2 hover:bg-neutral-700 w-full"
                onClick={handleSortByCreationDate}
              >
                <div className="flex">
                  <AiOutlineCalendar className="mr-4 text-xl" />
                  Por fecha de creación
                </div>
              </button>
              <button
                className="block px-3 py-2 hover:bg-neutral-700 w-full"
                onClick={handleSortByImportance}
              >
                <div className="flex">
                  <AiOutlineStar className="mr-4 text-xl" />
                  Por importancia
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="h-4 pl-8 text-zinc-400 cursor-default">
        <h4 className="text-xs"> {today} </h4>
      </div>
    </div>
  );
}
