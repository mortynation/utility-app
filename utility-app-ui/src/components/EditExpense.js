import React from "react";
import ExpenseService from "../services/ExpenseService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const EditExpense = () => {
  const categories = [
    "Other",
    "Enterntainment",
    "Groceries",
    "Utilities",
    "Self Care",
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    id: id,
    expenseName: "",
    category: "",
    expense: "",
    date: "",
  });

  const updateExpense = (e) => {
    e.preventDefault();
    console.log(expense);
    ExpenseService.editExpense(id, expense)
      .then((response) => {
        navigate("/expenseList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ExpenseService.getExpense(id);
        setExpense(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setExpense({
      ...expense,
      [e.target.name]: value,
    });
  };

  const handleDropdown = (e, cat) => {
    e.preventDefault();
    expense.category = cat;
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex max-w-2xl justify-center mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Expense</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Expense Name
          </label>
          <input
            type="text"
            name="expenseName"
            value={expense.expenseName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Category
          </label>
          <button
            type="text"
            name="category"
            value={expense.category}
            onClick={() => setIsOpen((prev) => !prev)}
            onChange={(e) => handleChange(e)}
            className="bg-gray-400 text-gray-600 text-sm font-normal justify-between rounded-lg border mt-2 px-10 py-2 w-96 active:border-black duration-300 active:text-white"
          >
            {expense.category}
          </button>
          {isOpen && (
            <div className="bg-gray-200 absolute flex flex-col items-start rounded-lg p-2 w-96">
              {categories.map((item, i) => (
                <div
                  onClick={(e, cat) => handleDropdown(e, item)}
                  className="justify-between w-full rounded-lg px-2 hover:cursor-pointer hover:bg-gray-100"
                  key={i}
                >
                  <h3>{item}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Expense (USD)
          </label>
          <input
            type="text"
            name="expense"
            value={expense.expense}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateExpense}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/expenseList")}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
