import React, { useState, useEffect } from 'react'
import {
  Form,
  Col
 } from 'react-bootstrap'
 import { commaSeparateNumber } from '../utils'

const ResultsTable = props => {

//Functional component state
  const [revenue, setRevenue] = useState(props.revenue)
  const [expense, setExpense] = useState(props.expense)
  const [term, setTerm] = useState(12)

//Sets the term length based on user selection
  const handleTermChange = event => {
    const { value } = event.target
    setTerm(value)
  }

//useEffect is watching for props changes and auto-updates the revenue or expense state on change. This is what makes the results automatically update on changes to expenses or revenues
  useEffect(() => {
    setRevenue(props.revenue)
    setExpense(props.expense)
  }, [props])

//Results table caluculations below. Look to refactor repeated code to a reusable function.

/*****************Revenue Calculations******************/
  const sumOneTimeRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.oneTime
  }, 0)
  const sumMonthlyRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.monthly
  }, 0)
  const sumTotalRevenue = sumOneTimeRevenue + (sumMonthlyRevenue * term)

/*****************Expense Calculations******************/
  const sumOneTimeExpense = expense.reduce((sum, expenseItem) => {
    return sum + expenseItem.oneTime
  }, 0)
  const sumMonthlyExpense = expense.reduce((sum, expenseItem) => {
    return sum + expenseItem.monthly
  }, 0)
  const sumTotalExpense = sumOneTimeExpense + (sumMonthlyExpense * term)

/*******Profit, Contribution, Margin, and ROI Calculations********/
  const monthlyContributionProfit = sumMonthlyRevenue - sumMonthlyExpense

  const totalContributionProfit = sumTotalRevenue - sumTotalExpense
  //Handle case where total revenue would be 0 and cause NaN
  const contributionMargin = sumTotalRevenue !== 0 ? (totalContributionProfit / sumTotalRevenue * 100).toFixed(0) : 0

  const capitalROI = (sumTotalExpense - sumTotalRevenue === 0 || sumMonthlyRevenue - sumMonthlyExpense === 0) ? 0 : ((sumOneTimeExpense - sumOneTimeRevenue) / monthlyContributionProfit).toFixed(1)


 //
 // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
 //  let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

  return (
    <div className="flex-large">
      <h2>Results Table</h2>
{/****************** Term Selection Dropdown****************/}
      <p>Select the term length in months</p>
      <Col sm={{ span: 2, offset: 0}} className="input-field">
        <Form.Control as="select" name="term" value={term} onChange={handleTermChange}>
            <option value="default" name="default" disabled={false}>Select Type</option>
            <option value={12} name="12 months">12-months</option>
            <option value={24} name="24 months">24-months</option>
            <option value={36} name="36 moths">36-months</option>
            <option value={48} name="48 months">48-months</option>
            <option value={60} name="60 months">60-months</option>
        </Form.Control>
      </Col>
{/********************** Results Table *********************/}
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
            <td>${commaSeparateNumber(sumOneTimeRevenue)}</td>
            <td>${commaSeparateNumber(sumMonthlyRevenue)}</td>
            <td>${commaSeparateNumber(sumTotalRevenue)}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>${commaSeparateNumber(sumOneTimeExpense)}</td>
            <td>${commaSeparateNumber(sumMonthlyExpense)}</td>
            <td>${commaSeparateNumber(sumTotalExpense)}</td>
          </tr>
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td>${commaSeparateNumber(monthlyContributionProfit)}</td>
            <td>${commaSeparateNumber(totalContributionProfit)}</td>
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
