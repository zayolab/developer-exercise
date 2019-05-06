// Kevin Valenzuela
import {
    Button
   } from 'react-bootstrap'
import React from 'react'

{/* Expenses Table */}
function ExpensesTable (props) {
    let expensesTableData = props.data.map((expense, index) => {
        return (
          <tr key={"expense" + index}>
                <td>{expense.name}</td>
                <td>${expense.oneTime.toFixed(2)}</td>
                <td>${expense.monthly.toFixed(2)}</td>
                <td><Button onClick={() => props.handleDelete('expenses', index)}>Delete</Button></td>
          </tr>
        )
      })
    return (
        <div>
            <table className="expenses-table">
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
                    {expensesTableData}
                </tbody>
            </table>
        </div>
    )
}
export default ExpensesTable;