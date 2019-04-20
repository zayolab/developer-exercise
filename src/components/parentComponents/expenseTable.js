import React from 'react'
import {
  Button
} from 'react-bootstrap'

const ExpenseTable = ({ expenseList,handleDelete }) => {
  let expensesTableData = expenseList.map((expense, index) => {
    return (
      <tr key={"expense" + index}>
        <td>{expense.name}</td>
        <td>${expense.oneTime.toFixed(2)}</td>
        <td>${expense.monthly.toFixed(2)}</td>
        <td><Button onClick={ () => handleDelete('expenses', index) }>Delete</Button></td>
      </tr>
    )
  })
  return expensesTableData
}
export default ExpenseTable
