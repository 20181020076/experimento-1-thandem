"use client";
import React, { useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/GlobalContext";
import StackPlanes from "./StackPlanes";

const StepView = () => {
  const { step, zonas, planesLiked, location, setLocation, setStep } =
    useContext(GlobalStateContext);

  useEffect(() => {
  }, [planesLiked, step, location]);

  // pagina seleccione localidad
  if (step == 0) {
    return (
      <div className="text-white">
        <div>Seleccione localidad</div>
        <div className="flex flex-col gap-5 justify-center items-center">
          {zonas.map((zona) => {
            return (
              <div
                key={zona.name}
                className="flex items-center justify-center w-[90%] h-[150px] overflow-hidden rounded-xl  relative"
                onClick={() => {
                  setLocation(zona.id);
                  setStep(1);
                }}
              >
                <img
                  alt={zona.name}
                  src={`/images/${zona.image}`}
                  className="bg-white w-full h-full object-cover z-0 absolute rounded-xl"
                />
                <span className="text-white z-10">{zona.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
    // pagina stack de planes en total
  } else if (step == 1) {
    if (location) {
      return (
        <div className="w-full h-[80%] text-white">
          <StackPlanes />
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => {
              setStep(0);
            }}
            className="w-[200px] bg-red-500"
          >
            no se selecciono zona toca aqui para SELECCIONAR ZONA
          </button>
        </div>
      );
    }
    // pagina stack de planes escogidos
  } else if (step == 2) {
    return (
      <div>
        <button
          onClick={() => {
            console.log(planesLiked);
          }}
        >
          click me
        </button>
        <div className="flex flex-col-reverse gap-5">
          {planesLiked.map((plan, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center w-full border border-red-600"
              >
                <div className="w-[270px] h-[250px] bg-secundary">
                  <h3>{plan.name}</h3>
                  <div className="w-full h-[150px] bg-red-400"></div>
                  <div className=""></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>A que juega viejo</div>;
  }
};

export default StepView;
