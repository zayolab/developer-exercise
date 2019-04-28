import React from 'react'
import { Button } from 'react-bootstrap';

// Component for revenue and expenses tables

const ROITable = (props) => {
  // create table rows from revenue/expenses state list
  let tableData = props.data.map((item, index) => {
    return (
      <tr key={props.type + index}>
        <td>{item.name}</td>
        <td>${item.oneTime.toFixed(2)}</td>
        <td>${item.monthly.toFixed(2)}</td>
        <td><Button onClick={() => props.handleDelete(props.type, item.id)}>Delete</Button></td>
      </tr>
    )
  })

  // capitalize first letter of table's type so it can be used for title
  const title = props.type.charAt(0).toUpperCase() + props.type.slice(1);
  
  // sent type in props, still setting that up
  return (
    <div>
      <table className={`${props.type}-table`}>
            <thead>
              <tr>
                <th>{title}</th>
              </tr>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData}
            </tbody>
          </table>
    </div>
  )
}

export default ROITable
