import React from 'react'
import {
  Button
 } from 'react-bootstrap'
 import { commaSeparateNumber } from '../utils'

const ExpenseTable = props => (
  <div className="flex-large">
    <h2>Expenses Table</h2>
    <table className="revenue-table">
      <thead>
        <tr>
          <th>Expenses</th>
        </tr>
        <tr>
          <th></th>
          <th>One-Time</th>
          <th>Monthly</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/*If there is revenue data, show that in the table*/}
        {props.expense.length > 0 ? (
          props.expense.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>${commaSeparateNumber(expense.oneTime)}</td>
              <td>${commaSeparateNumber(expense.monthly)}</td>
              <td><Button variant="danger" onClick={() => props.deleteExpense(expense.id)}>Delete</Button></td>
              <td><Button variant="success" onClick={() => props.editExpenseRow(expense)}>Edit</Button></td>
            </tr>
          ))
        )
        /*Else show "No Revenue Data"*/
        : (
            <tr>
              <td colSpan={3}>No Revenue Data</td>
            </tr>
          )
        }

      </tbody>
    </table>
  </div>
)

export default ExpenseTable
