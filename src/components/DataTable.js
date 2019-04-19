import React from 'react'
import '../App.css';
import {
  Button,
  Table
 } from 'react-bootstrap'
import { commaSeparateNumber } from '../utils'

const DataTable = props => {

  return (
    <div className="flex-large">
      <h2>{props.type} Table</h2>
      <Table striped bordered hover className="data-table">
        <thead>
          <tr>
            <th>{props.type}</th>
            <th>One-Time</th>
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
        {/*If there is revenue data, show that in the table*/}
          {props.dataSource.length > 0 ? (
            props.dataSource.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>${commaSeparateNumber(data.oneTime)}</td>
                <td>${commaSeparateNumber(data.monthly)}</td>
                <td><Button variant="danger" onClick={() => props.deleteData(data.id, props.type)}>Delete</Button></td>
                <td><Button variant="success" onClick={() => props.editDataRow(data, props.type)}>Edit</Button></td>
              </tr>
            ))
          )
        /*Else show "No Revenue Data"*/
          : (
              <tr>
                <td colSpan={3}>No {props.type} Data</td>
              </tr>
            )
          }

        </tbody>
      </Table>
    </div>
  )
}

export default DataTable
