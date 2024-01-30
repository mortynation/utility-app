package com.morty.dev.utilityappapi.service;

import com.morty.dev.utilityappapi.model.Expense;

import java.util.List;

public interface ExpenseService {
    Expense addExpense(Expense expense);

    List<Expense> getExpenses();

    Boolean deleteExpense(Long id);

    Expense editExpense(Long id, Expense expense);

    Expense getExpense(Long id);

    List<Expense> sortExpensesByYear(Integer year);

    List<Expense> sortExpensesByYearAndMonth(Integer year, Integer month);
}
