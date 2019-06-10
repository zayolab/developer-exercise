import React, { Component } from 'react'; 
import {
  Row,
  Col,
  Button,
  Form,
  Table
 } from 'react-bootstrap'
 import '../../App.css';

class Expenses extends Component {
  state = {  }
  render() { 
    // create table rows from expenses state list
    let expensesTableData = this.props.expenses.map((expense, index) => {
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
      <React.Fragment>
        {/* Expenses Table */}
        <Table striped bordered hover className="expenses-table">
        <caption>
          Expenses
        </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expensesTableData}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
 
export default Expenses;