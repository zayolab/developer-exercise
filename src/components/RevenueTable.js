import React from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

const RevenueTable = props => (
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
      {/*Insert Revenue Data Here*/}
      <tr key='1'>
        <td>Item Name</td>
        <td>$One Time, Two Decimal</td>
        <td>$Monthly, Two Decimal</td>
        <td><Button>Delete</Button></td>
      </tr>
    </tbody>
  </table>
)

export default RevenueTable
