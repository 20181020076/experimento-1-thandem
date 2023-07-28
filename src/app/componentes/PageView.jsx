"use client";
import React, { useState, useEffect, useContext } from "react";
import InputPlan from "../components/InputPlan";
import MessageChat from "../components/MessageChat";
import { GlobalStateContext } from "../context/GlobalContext";
import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

// const socket = io("http://localhost:5000");

const PageView = () => {
  const {
    inputState,
    validationToken,
    setInputState,
    handleSession,
    socket,
    messages,
    setMessages,
    sala
  } = useContext(GlobalStateContext);
  useEffect(() => {
    handleSession();
    console.log("vea la sala: ",sala)
    socket.emit('JoinRoom',{room:sala})
    socket.on('newUser',(res)=>console.log(res))
    
    return () => {
      socket.off("connection");
      socket.off("chatMessage");
      socket.off("JoinRoom");
      socket.off("newUser");

    



    };
  }, []);
 
  //   useEffect(() => {
  //     if (messagesEndRef.current) {
  //       messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  //     }
  //   }, [messages]);
  if (validationToken == null) {
    return <div>loading</div>;
  } else if (validationToken == true) {
    return (
      <div>
        <div className="w-full h-screen relative">
          <div className="flex flex-col items-center justify-center w-full h-[10%]">
            <h1 className="text-primary font-bold text-2xl">THANDEM</h1>
          </div>
          <div className="w-full h-[80%] bg-secundary overflow-y-scroll">
            
            <MessageChat/>
          </div>
          {/* componente set plan */}
          <div
            className={`flex flex-col items-center text-center justify-start w-full bg-primary bottom-0 overflow-y-scroll absolute ${
              inputState ? "h-[90%]" : "h-[15%]"
            }`}
          >
            <InputPlan />
          </div>
        </div>
      </div>
    );
  } else {
    window.location.href = "/";
  }
};

export default PageView;
