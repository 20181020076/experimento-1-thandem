"use client";
import { useState, useEffect } from "react";
export default function Home() {
  const [user, setUser] = useState("");
  const [sala, setSala] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(user === "" || sala === ""){
      return console.log("digite bien papa")
    }
    const modelUser = {
      user: user,
      sala: sala,
    };

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelUser),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status == "ok") {
      window.localStorage.setItem("accessToken", responseData.token);
      window.location.href = responseData.redirectUrl;
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center text-black relative">
      <h1 className="absolute top-[50px] text-primary font-bold text-2xl">THANDEM</h1>
      <div className="flex flex-col justify-center w-[85%] h-[300px] ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full justify-center bg-secundary rounded-3xl"
        >
          <div className="w-full h-[70%] flex flex-col gap-4 items-center justify-center">
            <label>Nickname</label>
            <input
              className="rounded-xl pl-2 w-[230px]"
              type="text"
              placeholder="Nombre"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <label>Sala</label>

            <input
              className="rounded-xl pl-2 w-[230px]"
              type="number"
              placeholder="Sala"
              onChange={(e) => {
                setSala(e.target.value);
              }}
            />
          </div>
          <div className="flex h-[30%] justify-center items-center ">
            <button className={`h-[30px] w-[100px] border border-white rounded-xl ${user === "" || sala === ""? "bg-disable text-white":"bg-[#ff7a00]"}`}>
              acceder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
