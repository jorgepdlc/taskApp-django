import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineSwitchVertical } from "react-icons/hi";

export function Toolbar() {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString("es-ES", options);
  return (
    <div className="w-full h-24 p-4">
      <div className="flex justify-between h-10">
        <div className="flex items-center">
          <AiOutlineMenu className="mr-2 ml-2 text-lg cursor-pointer" />
          <h1 className="font-semibold text-xl cursor-default text-sky-400">Tareas</h1>
        </div>
        <div className="flex items-center">
          <div
            className="flex items-center text-sky-400 h-auto hover:bg-zinc-700
                    rounded py-1 px-3 cursor-pointer"
          >
            <HiOutlineSwitchVertical className="mr-1 text-xl" />
            <h1 className="font-light">Ordenar</h1>
          </div>
        </div>
      </div>
      <div className="h-4 pl-8 text-zinc-400 cursor-default">
        <h4 className="text-xs"> {today} </h4>
      </div>
    </div>
  );
}
