import React from 'react'
import {
  Button
 } from 'react-bootstrap'

const ResultsTable = props => {
  const sumOneTimeRevenue = props.revenue.reduce((sum, revenue) => {
    console.log("Reven is", revenue.oneTime)
    return sum + revenue.oneTime
  }, 0)
  console.log("One time revenue total", sumOneTimeRevenue);
  return (
    <div className="flex-large">
      <h2>Results Table</h2>
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
            <td>${sumOneTimeRevenue}</td>
            <td>$Monthly Revenue Total</td>
            <td>$Total Revenue</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>$One-time Expense Total</td>
            <td>$Monthly Expense Total</td>
            <td>$Total Expense</td>
          </tr>
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td>$monthlyContributionProfit</td>
            <td>$totalContributionProfit</td>
          </tr>
          <tr>
            <td>Contribution Margin</td>
            <td></td>
            <td></td>
            <td>contributionMargin</td>
          </tr>
          <tr>
            <td>Capital ROI (monthly)</td>
            <td></td>
            <td></td>
            <td>capitalROI</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default ResultsTable
