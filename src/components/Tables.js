import React, { Component } from 'react';
import {
  Button
 } from 'react-bootstrap'
 import '../App.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  // function for handleDelete
  func = (e) => {
    if ((this.props.data[0].name).charAt(0) == 'I')
    {
      this.props.handleClick('revenue', e.target.value)
    } else {
      this.props.handleClick('expenses', e.target.value)
    }
  }

  render() {
    // create table rows from revenue or expense state list
    let revenueTableData = this.props.data.map((item, index) => {
      return (
        <tr key={"id" + index}>
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>

          <td>
            <Button
              onClick={this.func}
              value={index}
            >Delete
          </Button></td>
        </tr>
      )
    })

    // crate table header
    let tableHeader = '';
    if ((this.props.data[0].name).charAt(0) == 'I') {
      tableHeader = 'revenue'
    } else {
      tableHeader = 'expenses'
    }

    return (
      <table className='basic-table'>
        <thead>
          <tr>
            <th>{tableHeader}</th>
          </tr>
          <tr>
            <th></th>
            <th>One-Time</th>
            <th>Monthly</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {revenueTableData}
        </tbody>
      </table>
    )
  }
}

export {Table};
