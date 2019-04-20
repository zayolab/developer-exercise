import React from 'react'
import {
  Button
} from 'react-bootstrap'
const RevenueTable = ({ revenueList, handleDelete }) => {
 let revenueTableData = revenueList.map((item, index) => {
    return (
      <tr key={"revenue" + index}>
        <td>{item.name}</td>
        <td>${item.oneTime.toFixed(2)}</td>
        <td>${item.monthly.toFixed(2)}</td>
        <td><Button onClick={() => handleDelete('revenue', index)}>Delete</Button></td>
      </tr>
    )
  })
  return revenueTableData
}
export default RevenueTable
