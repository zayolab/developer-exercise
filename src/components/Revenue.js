import React, { Component } from 'react';
import {
  Button,
  Table
 } from 'react-bootstrap'
 import '../App.css';

class Revenue extends Component {
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
      <React.Fragment>
        {/* Revenue Table */}
        <Table striped bordered hover className="revenue-table">
        <caption>
          Revenue
        </caption>
          <thead sm={{ span: 2, offset: 1}}>
            <tr>
              <th class="col-sm-2">Name</th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {revenueTableData}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
 
export default Revenue;