"use client";
import React, { useEffect, useState } from "react";
const planes = [
  {
    id: 0,
    name: "cafe la perra",
    description: "el mejor del mindo",
  },
  {
    id: 1,
    name: "bar re melo",
    description: "el mejor del mindo",
  },
  {
    id: 2,
    name: "puteadero re melo re melo",
    description: "el mejor del mindo",
  },
  {
    id: 3,
    name: "bar re melo",
    description: "el mejor del mindo",
  },
  {
    id: 4,
    name: "bar re melo",
    description: "el mejor del mindo",
  },
  {
    id: 5,
    name: "bar re melo",
    description: "el mejor del mindo",
  },
  {
    id: 6,
    name: "xd re melo",
    description: "el mejor del mindo",
  },
];

const Stack2 = () => {
  const [planesNoVistos, setPlanesNoVistos] = useState(planes);
  const [planesLiked, setPlanesLiked] = useState([]);
  const [planesDontLiked, setPlanesDontLiked] = useState([]);

  const handlePlanesLiked = async(object) => {
    console.log(object.plan);
    if (object.state) {
        const newPlanesLiked = await [object.plan,...planesLiked ];
        // console.log(newPlanesLiked)
        await setTimeout(async()=>{
            console.log(planesLiked)
        },2000)
        
        await setPlanesLiked((prev) =>[...newPlanesLiked]);
        await setPlanesNoVistos(()=>[...planesNoVistos.slice(0, planesNoVistos.length - 1)]);
        

      
    } else {
      const newPlanesDontLiked = [...planesDontLiked, object.plan];
      setPlanesDontLiked(() =>[...newPlanesDontLiked]);
      setPlanesNoVistos(()=>[...planesNoVistos.slice(0, planesNoVistos.length - 1)]);

    //   console.log(planesDontLiked);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="relative w-[80%] h-[300px] ">
        {planesNoVistos.map((plan, index) => {
          return (
            <div
              key={plan.id}
              style={{ left: `${index * 5}px` }}
              className={`w-[250px] h-[300px] border-[3px] border-black bg-white absolute top-0 `}
            >
              {plan.name}
              <div className="w-[90%] bg-primary"></div>
              <div className="">
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

export default Stack2;
