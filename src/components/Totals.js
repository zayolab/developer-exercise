import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

const Totals = props => {


return (
    /* Totals Table */
    <div className="flex-large">
      <h2>Results</h2>
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
    </Table>
  )
}
export default Totals
