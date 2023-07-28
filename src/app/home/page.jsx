"use client";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import jwt from "jsonwebtoken";

const socket = io("http://localhost:5000");

export default function Home() {
  const [validationToken, setValidationToken] = useState(null);

  const [name, setName] = useState("");
  const [sala, setSala] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSession = async () => {
    const token = await window.localStorage.accessToken;
    console.log(token)
    try {
      const decodedToken = await jwt.verify(token, "hola");
      if (decodedToken) {
        setValidationToken(true);
        console.log(decodedToken);
        setName(decodedToken.userName);
        setSala(decodedToken.sala);
      } else {
        setValidationToken(false);
      }
    } catch (err) {
      setValidationToken(false);
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    if (message == "") {
      inputRef.current.value = "";
    } else {
      setMessages([...messages, newMessage]);
      socket.emit("send-message", { body: message, from: name,sala });
    }
    inputRef.current.value = "";
    setMessage("");
  };
  useEffect(() => {
    handleSession();
    socket.on("connection");
    socket.on("chat_message",(data)=>{

      setMessage(messages=>[...messages,data])
    })
    return () => {
      socket.off("connection");
      socket.off("chat_message");

    };
  }, []);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message.body]);
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  if (validationToken == null) {
    return <div>loading</div>;
  } else if (validationToken == true) {
    return (
      <div className="w-full h-screen bg-red-300 flex flex-col items-center justify-center text-black ">
        <div className="flex flex-col items-center w-full h-[80%] border overflow-y-scroll " ref={messagesEndRef}>
          <h2>{`hola ${name} esta en la sala ${sala}`}</h2>
          <div className="flex flex-col w-[90%] border border-black justify-end" >
            {messages.map((message) => {
              return (
                <h2
                  className={`text-white ${
                    message.from === "Me" ? "text-right" : ""
                  }`}
                  key={Math.random() * 100000}
                >
                  {message.from}:{message.body}
                </h2>
              );
            })}
          </div >
        </div>
        <div className="h-[20%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-20"
          >
            <input
              ref={inputRef}
              className="rounded-xl pl-2"
              type="text"
              placeholder="escriba su mensaje"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />

            <button className="text-white border border-white rounded-xl">
              acceder
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    window.location.href = "/";
  }
}
