import React, { useState, useEffect } from 'react'
import {
  Button
 } from 'react-bootstrap'

const ResultsTable = props => {

  //state
  const [revenue, setRevenue] = useState(props.revenue)

  useEffect(() => {
    console.log('Recieved Revenue Props is', props.revenue)
    setRevenue(props.revenue)
  }, [props])

  //Calculates the sum of one-time revenue. Updates with useEffect hook above if props change
  const sumOneTimeRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.oneTime
  }, 0)

  const sumMonthlyRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.monthly
  }, 0)

  const sumTotalRevenue = sumMonthlyRevenue + sumOneTimeRevenue


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
            <td>${sumMonthlyRevenue}</td>
            <td>${sumTotalRevenue}</td>
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
