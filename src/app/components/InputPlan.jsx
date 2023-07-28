"use client";
import React, { useContext } from "react";
import StepView from "./StepView";
import { GlobalStateContext } from "../context/GlobalContext";

const InputPlan = () => {

    const {inputState,setInputState, step,setStep, handleSubmitPlan,planesLiked, localidad, setLocalidad, planes, setPlanes} = useContext(GlobalStateContext);

  //   condicional step
  const handleStep = (direction) => {
    if (direction == "up") {
      if (step == 2) {
         setStep(0);
      } else {
        setStep(step+1)
      }
    } else if (direction == "down") {
        if (step == 0) {
            setStep(2);
         } else {
           setStep(step-1)
         }
    } else {
      console.log("que putas");
    }
  };

  if (inputState) {
    return (
      <div className="flex flex-col justify-start h-full w-full">
        <span className="text-right text-white text-4xl mr-3" onClick={()=>{setInputState(false)}}>x</span>
        <div>{step}</div>
        {/* vista condicionada */}
        <StepView step={step}/>
        {/* botones */}
        <div className="">
            {step>0&&(<button
            onClick={()=>{handleStep("down")}}
            className="bg-red-400 rounded-xl p-1"
          >
            Atras
          </button>)}
          {step<2?(<button
            onClick={()=>{handleStep("up")}}
            className="bg-primary border-[3px] border-white text-white rounded-xl"
          >
            Siguiente
          </button>):(<button onClick={()=>{handleSubmitPlan()}} className={`${planesLiked.length==0?"bg-disable":"bg-green-400"} rounded-xl p-1`}>CONFIRMAR PLAN</button>)}
          
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div
          onClick={() => setInputState(!inputState)}
          className="flex justify-center items-center w-[50px] h-[50px] text-white font-bold text-3xl border border-white rounded-full"
        >
          <span>+</span>
        </div>
      </div>
    );
  }
};

export default InputPlan;
