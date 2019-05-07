 import React, { Component } from 'react';
import {
  Button
 } from 'react-bootstrap'
import './MainPage.css';

export default class Expenses extends Component {

constructor(props) {
    super(props);

    console.log(this.props)
    this.props.handleDelete.bind(this)
    this.getExpensesTableData = this.getExpensesTableData.bind(this);
}


    getExpensesTableData() {

    	return(this.props.expenses.map((expense, index) => {
      return (
        <tr key={"expense" + index}>
          <td>{expense.name}</td>
          <td>${expense.oneTime.toFixed(2)}</td>
          <td>${expense.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.props.handleDelete('expenses', index)}>Delete</Button></td>
        </tr>
      )}))
    }


  render() {

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
              {this.getExpensesTableData()}
            </tbody>
          </table>



    );
  }


}