import React from 'react'
import { Form, Button } from 'react-bootstrap';


const DataTable = ({revenueList, handleDelete, expenseList}) => {
  // create table rows from revenue state list
  let revenueTableData = revenueList.map((item, index) => {
    return (
      <tr key={"revenue" + index}>
        <td>{item.name}</td>
        <td>${item.oneTime.toFixed(2)}</td>
        <td>${item.monthly.toFixed(2)}</td>
        <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
      </tr>
    )
  })
  // create table rows from expenses state list
  let expensesTableData = expenseList.map((expense, index) => {
    return (
      <tr key={"expense" + index}>
        <td>{expense.name}</td>
        <td>${expense.oneTime.toFixed(2)}</td>
        <td>${expense.monthly.toFixed(2)}</td>
        <td><Button onClick={() => this.handleDelete('expenses', index)}>Delete</Button></td>
      </tr>
    )
  })

return DataTable

}

export default DataTable
