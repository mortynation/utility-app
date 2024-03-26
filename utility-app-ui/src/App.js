import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import EditExpense from "./components/EditExpense";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/" element={<ExpenseList />} />
          <Route path="/expenseList" element={<ExpenseList />} />
          <Route path="/editExpense/:id" element={<EditExpense />} />
          <Route path="/toDoList" element={<ToDoList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
