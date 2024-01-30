package com.morty.dev.utilityappapi.service;

import com.morty.dev.utilityappapi.model.Expense;
import com.morty.dev.utilityappapi.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Boolean deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id).get();
        expenseRepository.delete(expense);
        return true;
    }

    @Override
    public Expense editExpense(Long id, Expense expense) {
        Expense expenseToBeEdited = expenseRepository.findById(id).get();
        expenseToBeEdited.setExpenseName(expense.getExpenseName());
        expenseToBeEdited.setCategory(expense.getCategory());
        expenseToBeEdited.setExpense(expense.getExpense());
        expenseToBeEdited.setDate(expense.getDate());
        expenseRepository.save(expenseToBeEdited);
        return expenseToBeEdited;
    }

    @Override
    public Expense getExpense(Long id) {
        return expenseRepository.findById(id).get();
    }

    @Override
    public List<Expense> sortExpensesByYear(Integer year) {
        return expenseRepository.findAll()
                .stream()
                .filter(expense -> LocalDate.parse(expense.getDate()).getYear() == year)
                .collect(Collectors.toList());
    }

    @Override
    public List<Expense> sortExpensesByYearAndMonth(Integer year, Integer month) {
        return expenseRepository.findAll()
                .stream()
                .filter(expense -> (LocalDate.parse(expense.getDate()).getYear() == year
                        && LocalDate.parse(expense.getDate()).getMonthValue() == month))
                .collect(Collectors.toList());
    }
}
