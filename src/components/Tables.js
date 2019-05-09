import React, { Component } from 'react';
import {
  Button
 } from 'react-bootstrap'

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // create table rows from revenue or expense state list
    let revenueTableData = this.props.data.map((item, index) => {
      return (
        <tr key={"revenue" + index}>
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
        </tr>
      )
    })

    return (
      <tbody>
        {revenueTableData}
      </tbody>
    )
  }
}

export {Table};
