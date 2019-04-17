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
      {/*If there is revenue data, show that in the table*/}
      {props.revenue.length > 0 ? (
        props.revenue.map((revenue, index) => (
          <tr key={index}>
            <td>{revenue.name}</td>
            <td>${revenue.oneTime}</td>
            <td>${revenue.monthly}</td>
            <td><Button variant="danger">Delete</Button></td>
          </tr>
        ))
      )
      /*Else show "No Revenue Data"*/
      : (
          <tr>
            <td colSpan={3}>No Revenue Data</td>
          </tr>
        )
      }

    </tbody>
  </table>
)

export default RevenueTable
