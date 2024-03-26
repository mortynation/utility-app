import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  let appList = ["Expense Tracker", "To Do List"];
  const [app, setApp] = useState("Expense Tracker");

  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <button
          className="text-white font-bold hover:bg-black active:border-black active:text-blue"
          onClick={() => {
            navigate("/");
          }}
        >
          {appList[0]}
        </button>
        <p className="text-white font-bold">{"|"}</p>
        <p
          className="text-white font-bold hover:bg-black active:border-black active:text-blue"
          onClick={() => {
            navigate("/toDoList");
          }}
        >
          {appList[1]}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
