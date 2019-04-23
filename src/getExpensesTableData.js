import React from 'react';
import './App.css'

export const getExpensesTableData = (expenses) => {
  return (
    expenses.map((expense, index) => {
      return (
        <tr key={"expense" + index}>
          <td>{expense.name}</td>
          <td>${expense.oneTime.toFixed(2)}</td>
          <td>${expense.monthly.toFixed(2)}</td>
        </tr>
      )
    })
  );
}