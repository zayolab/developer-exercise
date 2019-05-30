import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

const Results = props => {


return (

/* Totals Table */
<table className="totals-table">
  <thead>
    <tr>
      <th></th>
      <th>One-Time</th>
      <th>Monthly</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Revenue</td>
      <td>${(this.state.oneTimeRevenue).toFixed(2)}</td>
      <td>${(this.state.monthlyRevenue).toFixed(2)}</td>
      <td>${totalRevenue.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Expenses</td>
      <td>${(this.state.oneTimeExpense).toFixed(2)}</td>
      <td>${(this.state.monthlyExpense).toFixed(2)}</td>
      <td>${totalExpense.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Contribution Profit</td>
      <td></td>
      <td>${ monthlyContributionProfit.toFixed(2)}</td>
      <td>${ totalContributionProfit.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Contribution Margin</td>
      <td></td>
      <td></td>
      <td>{contributionMargin}%</td>
    </tr>
    <tr>
      <td>Capital ROI (monthly)</td>
      <td></td>
      <td></td>
      <td>{capitalROI}</td>
    </tr>
  </tbody>
</table>
