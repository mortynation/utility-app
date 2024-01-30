import axios from "axios";

const EXPENSE_API_BASE_URL = "http://localhost:8080/api/v1/expenses";

class ExpenseService {
  addExpense(expense) {
    return axios.post(EXPENSE_API_BASE_URL, expense);
  }

  getExpenses() {
    return axios.get(EXPENSE_API_BASE_URL);
  }

  deleteExpense(id) {
    return axios.delete(EXPENSE_API_BASE_URL + "/" + id);
  }

  editExpense(id, expense) {
    return axios.put(EXPENSE_API_BASE_URL + "/" + id, expense);
  }

  getExpense(id) {
    return axios.get(EXPENSE_API_BASE_URL + "/" + id);
  }

  sortExpensesByYearAndMonth(year, month) {
    return axios.get(EXPENSE_API_BASE_URL + "/sort", {
      params: { year: year, month: month },
    });
  }
}

export default new ExpenseService();
