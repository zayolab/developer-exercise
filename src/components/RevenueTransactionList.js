import React, { Component } from 'react'
import Transaction from './Transaction';

export class RevenueTransactionList extends Component {
  render() {
    return this.props.RevenueTransactionList.map((item) => (
        <Transaction key={item.id} element={item} revenue={true} />
    ))
}
}
/*
    let revenueTableData = this.state.revenue.map((item, index) => {
      return (
        <tr key={"revenue" + index}>
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
        </tr>
      )
    })
*/
export default RevenueTransactionList
