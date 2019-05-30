import React from 'react'
import '../App.css';
import { Form } from 'react-bootstrap';


const DataTable = props => {


return (
  <Form className="roi-tables">
    {/* Revenue Table */}
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
    {/* Expenses Table */}
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Expenses</th>
        </tr>
        <tr>
          <th></th>
          <th>One-Time</th>
          <th>Monthly</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expensesTableData}
      </tbody>
    </table>
  </Form>

 )
}

export default DataTable
