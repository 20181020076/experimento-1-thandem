import React, { useState, useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/GlobalContext";
const MessageChat = () => {
  const { messages, userName, planes } = useContext(GlobalStateContext);
  const handleCardCompletePlan = async () => {
    // setCardPlanes(planes.filter(p=>[messages.id].includes(p)))
  };

  useEffect(() => {
    console.log(messages);

  }, [messages]);
  return (
    <div className="w-full border border-black">
      {messages.map((message, index) => {
        
        return (
          <div key={index} className={`flex w-full ${message.userName === userName?" justify-end":"justify-start"}`}>
            <div key={index} className={`flex flex-col w-[80%] ${message.userName === userName?"bg-purple-400 text-right items-end":"bg-primary"}`}>
              {message.userName === userName ? "me" : message.userName}
              {message.planes}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageChat;
