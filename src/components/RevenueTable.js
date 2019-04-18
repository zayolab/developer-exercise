import React from 'react'
import {
  Button
 } from 'react-bootstrap'
import { commaSeparateNumber } from '../utils'

const RevenueTable = props => {

  return (
    <div className="flex-large">
      <h2>Revenue Table</h2>
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
                <td>${commaSeparateNumber(revenue.oneTime)}</td>
                <td>${commaSeparateNumber(revenue.monthly)}</td>
                <td><Button variant="danger" onClick={() => props.deleteRevenue(revenue.id)}>Delete</Button></td>
                <td><Button variant="success" onClick={() => props.editRevenueRow(revenue)}>Edit</Button></td>
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
    </div>
  )
}

export default RevenueTable
