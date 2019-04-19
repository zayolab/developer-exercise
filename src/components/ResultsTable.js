import React, { useState, useEffect } from 'react'
import {
  Form,
  Col,
  Table
 } from 'react-bootstrap'
 import { commaSeparateNumber, formatNumber } from '../utils'

const ResultsTable = props => {

/*************** Functional Component State ********************/

  const [revenue, setRevenue] = useState(props.revenue)
  const [expense, setExpense] = useState(props.expense)
  const [term, setTerm] = useState(12)

/************************ Event Handling **********************/

  const handleTermChange = event => {
    const { value } = event.target
    setTerm(value)
  }

/*************** Listen for Props Changes **********************/

  useEffect(() => {
    setRevenue(props.revenue)
    setExpense(props.expense)
  }, [props])

/***************** Revenue Calculations ******************/

  const sumOneTimeRevenue = (revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.oneTime
  }, 0))
  const sumMonthlyRevenue = revenue.reduce((sum, revenueItem) => {
    return sum + revenueItem.monthly
  }, 0)
  const sumTotalRevenue = sumOneTimeRevenue + (sumMonthlyRevenue * term)

/***************** Expense Calculations ******************/
  const sumOneTimeExpense = expense.reduce((sum, expenseItem) => {
    return sum + expenseItem.oneTime
  }, 0)
  const sumMonthlyExpense = expense.reduce((sum, expenseItem) => {
    return sum + expenseItem.monthly
  }, 0)
  const sumTotalExpense = sumOneTimeExpense + (sumMonthlyExpense * term)

/****** Profit, Contribution, Margin, and ROI Calculations *******/

  const monthlyContributionProfit = sumMonthlyRevenue - sumMonthlyExpense

  const totalContributionProfit = sumTotalRevenue - sumTotalExpense

  //Handle case where total revenue would be 0 and cause NaN
  const contributionMargin = sumTotalRevenue !== 0 ? ((totalContributionProfit / sumTotalRevenue) * 100).toFixed(0) : 0

  const capitalROI = (sumTotalExpense - sumTotalRevenue === 0) || (sumMonthlyRevenue - sumMonthlyExpense === 0) ? 0 : ((sumOneTimeExpense - sumOneTimeRevenue) / monthlyContributionProfit).toFixed(1)

/******************* Component Return ***************************/
  return (
    <div className="flex-large">
      <h2>Results Table</h2>
  {/********* Term Selection Dropdown*******/}
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
  {/************* Results Table ************/}
      <Table striped bordered hover className="totals-table">
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
            <td>${formatNumber(sumOneTimeRevenue, 2)}</td>
            <td>${formatNumber(sumMonthlyRevenue, 2)}</td>
            <td>${formatNumber(sumTotalRevenue, 2)}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>${formatNumber(sumOneTimeExpense, 2)}</td>
            <td>${formatNumber(sumMonthlyExpense, 2)}</td>
            <td>${formatNumber(sumTotalExpense, 2)}</td>
          </tr>
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td bgcolor={monthlyContributionProfit < 0 && "red"}>${formatNumber(monthlyContributionProfit, 2)}</td>
            <td bgcolor={totalContributionProfit < 0 && "red"}>${formatNumber(totalContributionProfit, 2)}</td>
          </tr>
          <tr>
            <td>Contribution Margin</td>
            <td></td>
            <td></td>
            <td bgcolor={contributionMargin < 0 && "red"}>{contributionMargin}%</td>
          </tr>
          <tr>
            <td>Capital ROI (monthly)</td>
            <td></td>
            <td></td>
            <td bgcolor={capitalROI < 0 && "red"}>{capitalROI}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
export default ResultsTable
