import React from "react";
import Link from "next/link";

const SelecionaZona = () => {
  return (
    <div className="w-full bg-red-300 flex justify-center items-center py-10">
      <div className="w-[80%] flex flex-col ">
        <h1 className="text-center font-bold text-2xl">Selecciona una Zona</h1>
        <div className="flex flex-col gap-5 mt-6">
          {zonas.map((zona,index) => {
            return (
              <Link
              key={index}
                href={`/${zona}`}
                className="w-full h-[200px] bg-white flex justify-center items-center rounded-xl"
              >
                <h1>{zona}</h1>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelecionaZona;
