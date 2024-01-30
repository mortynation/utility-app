package com.morty.dev.utilityappapi.controller;


import com.morty.dev.utilityappapi.model.Expense;
import com.morty.dev.utilityappapi.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/expenses")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @GetMapping("/expenses")
    public List<Expense> getExpenses() {
        return expenseService.getExpenses();
    }

    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteExpense(@PathVariable Long id) {
        Boolean deleted = false;
        deleted = expenseService.deleteExpense(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/expenses/{id}")
    public Expense getExpense(@PathVariable Long id) {
        return expenseService.getExpense(id);
    }

    @PutMapping("/expenses/{id}")
    public ResponseEntity<Expense> editExpense(@PathVariable Long id, @RequestBody Expense expense) {
        Expense editedExpense = expenseService.editExpense(id, expense);
        return ResponseEntity.ok(editedExpense);
    }

    @GetMapping("/expenses/year/{year}")
    public List<Expense> sortExpensesByYear(@PathVariable Integer year) {
        return expenseService.sortExpensesByYear(year);
    }

    @GetMapping("/expenses/sort")
    public List<Expense> sortExpensesByYearAndMonth(@RequestParam Integer year, @RequestParam Integer month) {
        return expenseService.sortExpensesByYearAndMonth(year, month);
    }
}
