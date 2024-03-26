import React from "react";
import { useState } from "react";

const ToDoList = () => {
  var currentDateTime = new Date();
  const [tasks, setTasks] = useState([
    {
      description: "Finish Homework",
      dateTime: currentDateTime.toLocaleString(),
    },
    {
      description: "Wash Dishes",
      dateTime: currentDateTime.toLocaleString(),
    },
  ]);
  const [newTask, setNewTask] = useState({ description: "", dateTime: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const deleteTask = (e, index) => {
    e.preventDefault();
    setTasks(tasks.filter((element, i) => i !== index));
  };

  const moveTaskUp = (e, index) => {
    e.preventDefault();
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (e, index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.description.trim() !== "") {
      newTask.dateTime = currentDateTime.toLocaleString();
      setTasks((t) => [...t, newTask]);
      setNewTask({ description: "", dateTime: "" });
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12 flex items-end justify-center">
        <input
          className="border-4 mr-3 px-10 py-0.5 text-sm text-gray-500"
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        ></input>
        <button
          className="rounded bg-slate-600 text-white px-6 py-1 font-semibold"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="flex shadow border-b my-4">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Task Description
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Date and Time
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {tasks.map((task, index) => {
              return (
                <tr key={index}>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {task.description}
                    </div>
                  </td>
                  <td className="text-left px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{task.dateTime}</div>
                  </td>
                  <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                    <a
                      onClick={(e) => deleteTask(e, index)}
                      className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer mr-4"
                    >
                      ❌
                    </a>
                    <a
                      onClick={(e) => moveTaskUp(e, index)}
                      className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer mr-4"
                    >
                      👆
                    </a>
                    <a
                      onClick={(e) => moveTaskDown(e, index)}
                      className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
                    >
                      👇
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
