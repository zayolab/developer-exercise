import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './../App.css';

class ExpenseTable extends Component {
      
    render() {
        // create table rows from expenses state list
        let expensesTableData = this.props.expense.map((expense, index) => {
            return (
              <tr key={"expense" + index}>
                <td>{expense.name}</td>
                <td>${expense.oneTime.toFixed(2)}</td>
                <td>${expense.monthly.toFixed(2)}</td>
                <td><Button onClick={() => this.props.handleDelete('expenses', index)}>Delete</Button></td>
              </tr>
            )
        })

        return (
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
        );
    };
}

export default ExpenseTable;