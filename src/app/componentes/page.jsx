"use client";
import React, { useState, useContext } from "react";
import InputPlan from "../components/InputPlan";
import {GlobalStateProvider } from "../context/GlobalContext";
import PageView from "./PageView";
const page = () => {

  return (
    <GlobalStateProvider>
      <PageView/>
    </GlobalStateProvider>
  );
};

export default page;
