import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <button
          className="text-white font-bold hover:bg-black active:border-black active:text-blue"
          onClick={() => {
            navigate("/");
          }}
        >
          Epense Tracker
        </button>
        <p className="text-white font-bold">{"|"}</p>
        <button
          className="text-white font-bold hover:bg-black active:border-black active:text-blue"
          onClick={() => {
            navigate("/toDoList");
          }}
        >
          To Do List
        </button>
      </div>
    </div>
  );
};

export default Navbar;
