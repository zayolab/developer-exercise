import React, { useState, useEffect } from 'react'
import {
  Button
 } from 'react-bootstrap'

const ResultsTable = props => {

//Functional component state
  const [revenue, setRevenue] = useState(props.revenue)
  const [expense, setExpense] = useState(props.expense)
  const [term, setTerm] = useState(props.term)

//useEffect is watching for props changes and auto-updates the revenue or expense state on change. This is what makes the results automatically update on changes to expenses or revenues
  useEffect(() => {
    console.log('Recieved Term', props.term)
    setRevenue(props.revenue)
    setExpense(props.expense)
    setTerm(props.term)
  }, [props])

//Results table caluculations below. Look to refactor repeated code to a reusable function.

/*****************Revenue Calculations******************/
  const sumOneTimeRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.oneTime
  }, 0)
  const sumMonthlyRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.monthly
  }, 0)
  const sumTotalRevenue = sumMonthlyRevenue + sumOneTimeRevenue

/*****************Expense Calculations******************/
  const sumOneTimeExpense = expense.reduce((sum, expenseItem) => {
    return sum + expenseItem.oneTime
  }, 0)
  const sumMonthlyExpense = expense.reduce((sum, expenseItem) => {
    return sum + expenseItem.monthly
  }, 0)
  const sumTotalExpense = sumMonthlyExpense + sumOneTimeExpense

/*******Profit, Contribution, Margin, and ROI Calculations********/
  const monthlyContributionProfit = sumMonthlyRevenue - sumMonthlyExpense

  const totalContributionProfit = sumTotalRevenue - sumTotalExpense
  //Handle case where total revenue would be 0 and cause NaN
  const contributionMargin = sumTotalRevenue !== 0 ? (totalContributionProfit / sumTotalRevenue * 100).toFixed(0) : 0

  const capitalROI = (sumTotalExpense - sumTotalRevenue === 0) ? 0 : (sumOneTimeExpense - sumOneTimeRevenue) / monthlyContributionProfit.toFixed(1)


 //
 // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
 //  let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

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
            <td>${sumOneTimeExpense}</td>
            <td>${sumMonthlyExpense}</td>
            <td>${sumTotalExpense}</td>
          </tr>
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td>${monthlyContributionProfit}</td>
            <td>${totalContributionProfit}</td>
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
    </div>
  )
}
export default ResultsTable
