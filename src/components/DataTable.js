import React from 'react'
import { Col, Button, Table } from 'react-bootstrap';


const DataTable = ({moneyList, handleDelete, name}) => {

  return (
    moneyList.map((item, index) => {
      return (
      <Col>
        <Table>
          <trbody>
            <tr key={name + index}>
              <td>{item.name}</td>
              <td>${item.oneTime.toFixed(2)}</td>
              <td>${item.monthly.toFixed(2)}</td>
              <td><Button onClick={() => this.handleDelete(name, index)}>Delete</Button></td>
            </tr>
          </trbody>
        </Table>
      </Col>
      )
    })
  )
}

export default DataTable
