import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './../App.css';

class RevenueTable extends Component {

    render() {
      // create table rows from revenue state list
      let revenueTableData = this.props.revenue.map((item, index) => {
          return (
          <tr key={"revenue" + index}>
              <td>{item.name}</td>
              <td>${item.oneTime.toFixed(2)}</td>
              <td>${item.monthly.toFixed(2)}</td>
              <td><Button onClick={() => this.props.handleDelete('revenue', index)}>Delete</Button></td>
          </tr>
          )
      })

      return (
          <table className="revenue-table">
          <thead>
            <tr>
              <th>Revenue</th>
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
      );
    }
}

export default RevenueTable;