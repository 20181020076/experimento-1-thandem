"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../context/GlobalContext";




const StackPlanes = () => {
    const {planesLiked, setPlanesLiked, planesDontLiked, setPlanesDontLiked ,planesNoVistos, setPlanesNoVistos, zonas, location, step, setStep} = useContext(GlobalStateContext)
    const [zonaCurrent, setZonaCurrent] = useState()

    const handleZona = async () => {
        for (const zona of zonas) {
          if (zona.id === location) {
            
            return zona; // Si encontramos el objeto, salimos de la función.
          }
        }
        return console.log("Objeto no encontrado");
      };
    

  const handlePlanesLiked = async (object) => {
    console.log(object.plan);
    if (object.state) {
      const newPlanesLiked = [object.plan, ...planesLiked];

      await setPlanesLiked((prev) => [...newPlanesLiked]);
      await setPlanesNoVistos(() => [
        ...planesNoVistos.slice(0, planesNoVistos.length - 1),
      ]);

    } else {
      const newPlanesDontLiked = [...planesDontLiked, object.plan];
      setPlanesDontLiked(() => [...newPlanesDontLiked]);
      setPlanesNoVistos(() => [
        ...planesNoVistos.slice(0, planesNoVistos.length - 1),
      ]);

      //   console.log(planesDontLiked);
    }
  };
  useEffect(() => {

    
    handleZona().then((res)=>{setZonaCurrent(res)})
    // setZonaCurrent(zonas.find(zona=>{zona.id==location}))

  }, [planesLiked, zonaCurrent]);
  return (
    <div className="flex flex-col justify-center items-center w-full ">
        {zonaCurrent?<h2>{`estas en la zona de ${zonaCurrent.name}`}</h2>:<span>{`porque no sirve :(`}</span>}
        
      <div className="relative w-[80%] h-[300px] ">
        {/* cartas individuales */}
        {planesNoVistos.map((plan, index) => {
          return (
            <div
              key={plan.id}
              style={{ left: `${index * 5}px` }}
              className={`flex flex-col items-center w-[250px] h-[300px] border-[3px] border-black bg-white absolute top-0 text-black`}
            >
                <div className="flex w-full gap-2">
                    {plan.types.map((type,index)=>{
                        return(
                            <div key={index} className="w-[50px] bg-orange-400 rounded-lg text-[10px] my-1">
                                {type}
                            </div>
                        )
                    })}
                </div>
                <span>{plan.name}</span>
              
              <div className="w-full h-[50%] bg-primary"></div>
              <div className="flex text-black">
                <button
                  onClick={() =>
                    handlePlanesLiked({ state: false, plan: plan })
                  }
                  className="bg-red-400"
                >
                  Pasar
                </button>
                <button
                  onClick={() => handlePlanesLiked({ state: true, plan: plan })}
                  className="bg-green-400"
                >
                  Agregar
                </button>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackPlanes;
