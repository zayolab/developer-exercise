import React, { Component } from 'react';
import {
  Button
 } from 'react-bootstrap'

export default class Revenue extends Component {

constructor(props) {
    super(props);
    this.props.handleDelete.bind(this);
    this.getRevenueTableData = this.getRevenueTableData.bind(this);
}



getRevenueTableData() {
  return (this.props.revenue.map((item, index) => { 
      return (
        <tr key={"revenue" + index}>
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.props.handleDelete('revenue', index)}>Delete</Button></td>
        </tr>
      )
    }))
}



  render() {


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
              {this.getRevenueTableData()}
            </tbody>
          </table>


    );
  }






  }
