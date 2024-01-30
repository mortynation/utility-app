import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Expense from "./Expense";
import ExpenseService from "../services/ExpenseService";
import { useEffect } from "react";

const ExpenseList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState(null);
  const [isYearDDOpen, setIsYearDDOpen] = useState(false);
  const [isMonthDDOpen, setIsMonthDDOpen] = useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [isSort, setIsSort] = useState(true);
  const [isCategoryDDOpen, setIsCategoryDDOpen] = useState(false);
  const [category, setCategory] = useState(null);
  let currSum = 0;

  const years = [];
  for (let i = 1990; i <= 2024; i++) {
    years.push(i);
  }

  const categories = [
    "Entertainment",
    "Self Care",
    "Entertainment",
    "Utility",
    "Other",
  ];

  const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const handleYearDropdown = (e, item) => {
    e.preventDefault();
    setYear(item);
    setIsYearDDOpen(false);
  };

  const handleMonthDropdown = (e, item) => {
    e.preventDefault();
    setMonth(item);
    setIsMonthDDOpen(false);
  };

  const deleteExpense = (e, id) => {
    e.preventDefault();
    ExpenseService.deleteExpense(id).then((res) => {
      if (expenses) {
        setExpenses((prevElement) => {
          return prevElement.filter((expense) => expense.id !== id);
        });
      }
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ExpenseService.getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortExpensesByYearAndMonth = (e) => {
    e.preventDefault();
    setIsSort((prev) => !prev);
    if (isSort) {
      ExpenseService.sortExpensesByYearAndMonth(year, months[month])
        .then((response) => {
          console.log(response);
          setExpenses(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetchData();
    }
  };

  const sumOfExpenses = (exp) => {
    currSum += Number(exp);
  };

  const handleCategoryDropdown = (e, cat) => {
    e.preventDefault();
    setIsCategoryDDOpen(false);
    setCategory(cat);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12 flex items-end justify-between">
        <button
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          onClick={() => navigate("/addExpense")}
        >
          Add Expense
        </button>
        <div className="flex items-center gap-4 relative">
          <button
            className="rounded-lg bg-gray-400 text-gray-600 px-6 py-2 font-semibold justify-between border active:border-black duration-300 active:text-white"
            onClick={(prev) => setIsYearDDOpen((prev) => !prev)}
          >
            {year ? year : "Year"}
          </button>
          {isYearDDOpen && (
            <div className="bg-gray-200 absolute flex-col items-start rounded-lg h-20 overflow-auto p-2 w-24 top-full mt-2">
              {years.map((item, i) => (
                <div
                  onClick={(e, cat) => handleYearDropdown(e, item)}
                  className="justify-between w-full rounded-lg px-2 hover:cursor-pointer hover:bg-gray-100"
                  key={i}
                >
                  <h3>{item}</h3>
                </div>
              ))}
            </div>
          )}
          <div>
            <button
              className="rounded-lg bg-gray-400 text-gray-600 px-6 py-2 font-semibold justify-between border active:border-black duration-300 active:text-white"
              onClick={(prev) => setIsMonthDDOpen((prev) => !prev)}
            >
              {month ? month : "Month"}
            </button>
            {isMonthDDOpen && (
              <div className="bg-gray-200 absolute flex flex-col items-start rounded-lg p-2 w-24 top-full mt-2">
                {Object.keys(months).map((item, i) => (
                  <div
                    onClick={(e, cat) => handleMonthDropdown(e, item)}
                    className="justify-between w-full rounded-lg px-2 hover:cursor-pointer hover:bg-gray-100"
                    key={i}
                  >
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="rounded-lg bg-gray-400 text-gray-600 px-6 py-2 font-semibold justify-between border active:border-black duration-300 active:text-white"
            onClick={sortExpensesByYearAndMonth}
          >
            {isSort ? "Sort" : "Clear"}
          </button>
        </div>
      </div>
      <div className="flex shadow border-b my-4">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Expense Name
              </th>
              <th
                className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6"
                onClick={(prev) => setIsCategoryDDOpen((prev) => !prev)}
              >
                Category
                {isCategoryDDOpen && (
                  <div className="bg-gray-200 absolute flex flex-col items-start rounded-lg p-2">
                    {categories.map((item, i) => (
                      <div
                        onClick={(e, cat) => handleCategoryDropdown(e, item)}
                        className="justify-between w-full rounded-lg px-2 hover:cursor-pointer hover:bg-gray-100"
                        key={i}
                      >
                        <h3>{item}</h3>
                      </div>
                    ))}
                  </div>
                )}
              </th>

              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Expense
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Date
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {expenses.map((expense) => {
                sumOfExpenses(expense.expense);
                return (
                  <Expense
                    expense={expense}
                    deleteExpense={deleteExpense}
                    key={expense.id}
                  />
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <div className="items-center justify-center h-14 w-full my-4">
        <label className="block text-gray-600 text-sm font-normal">
          Total Expenditure =
        </label>
        <div className="block text-gray-600 text-sm font-normal">{currSum}</div>
      </div>
    </div>
  );
};

export default ExpenseList;
