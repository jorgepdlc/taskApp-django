import { Link } from "react-router-dom";

import { LiaSearchSolid } from "react-icons/lia";
import { PiDotsNineBold } from "react-icons/pi";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

export function Navigation() {
  return (
    <div className="flex h-12 justify-between w-full border-b border-b-gray-700 py-2">
      <div className="flex items-center ml-3">
        <div className="text-3xl mr-5">
          <Link to="/tasks">
            <PiDotsNineBold className="text-white hover:text-sky-400" />
          </Link>
        </div>
        <div className="">
          <Link to="/tasks">
            <h1 className="font-semibold hover:text-sky-400">To Do</h1>
          </Link>
        </div>
      </div>

      <div className="searchbar grid grid-cols-1 content-center w-2/6">
        <div
          className="flex items-center h-auto bg-zinc-800 hover:bg-zinc-700
                focus:border-transparent rounded p-1"
        >
          <LiaSearchSolid className="text-blue-400 mr-2 stroke-1" />
          <input
            className="bg-transparent border-none w-full focus:outline-none shadow-none"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center mr-3">
        <RiSettings4Line className="text-2xl hover:text-sky-400 cursor-pointer" />
        <AiOutlineUser className="text-2xl ml-3 hover:text-sky-400 cursor-pointer" />
      </div>
    </div>
  );
}
