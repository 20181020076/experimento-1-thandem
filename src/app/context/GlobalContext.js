"use client";
import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

const GlobalStateContext = createContext();
const socket = io("http://localhost:5000");

const planesTest = [
  {
    id: 0,
    name: "Dakiti",
    description: "el bar pa conocer gente re chimba",
    image: "monoBandido.jpg",
    types: ["cafe", "bar"],
  },
  {
    id: 1,
    name: "caminatas",
    description: "el bar pa conocer gente re chimba",
    image: "monoBandido.jpg",
    types: ["cafe", "bar"],
  },
  {
    id: 2,
    name: "sanfungueo extremo",
    description: "el bar pa conocer gente re chimba",
    image: "monoBandido.jpg",
    types: ["cafe", "bar"],
  },
  {
    id: 3,
    name: "el perro hijueputa",
    description: "el bar pa conocer gente re chimba",
    image: "monoBandido.jpg",
    types: ["cafe", "bar"],
  },
  {
    id: 4,
    name: "el mono hijueputa",
    description: "el bar pa conocer gente re chimba",
    image: "monoBandido.jpg",
    types: ["cafe", "bar"],
  },
  {
    id: 5,
    name: "qliar",
    description: "una re chimba re chimba",
    image: "monoBandido.jpg",
    types: ["cafe", "bar"],
  },
  {
    id: 6,
    name: "xs plan",
    description: "el plan mas xd del mundo",
    image: "monoBandido.jpg",
    types: ["comida", "putas"],
  },
];

const GlobalStateProvider = ({ children }) => {
  const [inputState, setInputState] = useState(false);
  const [planes, setPlanes] = useState(planesTest);
  const [planesLiked, setPlanesLiked] = useState([]);
  const [planesDontLiked, setPlanesDontLiked] = useState([]);
  const [planesNoVistos, setPlanesNoVistos] = useState(planes);
  const [location, setLocation] = useState(1);
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [validationToken, setValidationToken] = useState(null);
  const [userName, setUserName] = useState("");
  const [sala, setSala] = useState();

  const zonas = [
    { id: 1, name: "Usaquen", image: "usaquen.jpg" },
    { id: 2, name: "Parkway", image: "usaquen.jpg" },
    { id: 3, name: "Chapinero", image: "usaquen.jpg" },
    { id: 4, name: "Modelia", image: "usaquen.jpg" },
  ];
  const handleSession = async () => {
    const token = await window.localStorage.accessToken;
    console.log(token);
    try {
      const decodedToken = await jwt.verify(token, "hola");
      if (decodedToken) {
        setValidationToken(true);
        console.log(decodedToken);
        setUserName(decodedToken.userName);
        setSala(decodedToken.sala);
      } else {
        setValidationToken(false);
      }
    } catch (err) {
      setValidationToken(false);
      console.log(err);
    }
  };
  const handleSubmitPlan = async () => {
    if (planesLiked.length == 0) {
      return;
    }
    const idPlanes = planesLiked.map((plan) => {
      return plan.id;
    });
    const messageModel = {
      userName: userName,
      planes: idPlanes,
    };

    socket.emit("send-message", messageModel);
    setInputState(false);
    setPlanesLiked([]);
    setPlanesDontLiked([]);
    setPlanesNoVistos(planes);
    setLocation(0);
    setStep(0);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        userName,

        validationToken,
        setValidationToken,
        socket,
        messages,
        setMessages,
        inputState,
        setInputState,
        planes,
        setPlanes,
        planesLiked,
        setPlanesLiked,
        planesDontLiked,
        setPlanesDontLiked,
        step,
        setStep,
        location,
        setLocation,
        zonas,
        handleSession,
        planesNoVistos,
        setPlanesNoVistos,
        handleSubmitPlan,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
