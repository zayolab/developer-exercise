// Kevin Valenzuela
import {
    Button
   } from 'react-bootstrap'
import React from 'react'

{/* Revenue Table */}
function RevenueTable(props){
    let revenueTableData = props.data.map((item, index) => {
        return (
          <tr key={"revenue" + index}>
            <td>{item.name}</td>
            <td>${item.oneTime.toFixed(2)}</td>
            <td>${item.monthly.toFixed(2)}</td>
            <td><Button onClick={() => props.handleDelete('revenue', index)}>Delete</Button></td>
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

    )
}
export default RevenueTable;