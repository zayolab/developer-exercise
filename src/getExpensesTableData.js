import React from 'react';
import {Button} from 'react-bootstrap' 
import './App.css'

export const getExpensesTableData = (expenses, onDelete) => {
  return (
    expenses.map((expenses, index) => {
      return (
        <tr key={"expense" + index}>
          <td>{expenses.name}</td>
          <td>${expenses.oneTime.toFixed(2)}</td>
          <td>${expenses.monthly.toFixed(2)}</td>
          <td><Button onClick={() => onDelete('expenses', index)}>Delete</Button></td>
        </tr>
      )
    })
  );
}
