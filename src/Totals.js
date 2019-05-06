import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

class Totals extends Component {
  constructor(){
    super()
    this.state = {
      time_interval: 12
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  handleTimeChange(e) {
    this.setState({
      time_interval: Number(e.target.value)
    })
  }

  render() {
    // Calculations for totals
    var totalRevenue = this.props.oneTimeRevenue + (this.props.monthlyRevenue * this.state.time_interval)
    let totalExpense = this.props.oneTimeExpense + (this.props.monthlyExpense * this.state.time_interval)
    let time_interval_ContributionProfit = this.props.monthlyRevenue - this.props.monthlyExpense
    let totalContributionProfit = totalRevenue - totalExpense
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
      // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.props.oneTimeExpense - this.props.oneTimeRevenue) / time_interval_ContributionProfit).toFixed(1)

    console.log(this.state.time_interval)
    return (
      <div>
        <div>
        <h1 className="text-center">Select the Total by Month Term</h1>
        <Form>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control
                as="select"
                onChange = {this.handleTimeChange}
                value={this.state.time_interval ? this.state.time_interval : 12}
                >
                <option value={12} disabled={true}>Select Month-Total Term</option>
                <option value={12}>12 Months</option>
                <option value={24}>24 Months</option>
                <option value={36}>36 Months</option>
                <option value={48}>48 Months</option>
                <option value={60}>60 Months</option>
              </Form.Control>
            </Col>
          </Row>
        </Form>
        {/* Totals Table */}
        <table className="totals-table">
        <thead>
          <tr>
            <th></th>
            <th>One-Time Total</th>
            <th>Monthly</th>
            <th>Totals After {this.state.time_interval} Month Term</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Revenue</td>
            <td>${(this.props.oneTimeRevenue).toFixed(2)}</td>
            <td>${(this.props.monthlyRevenue).toFixed(2)}</td>
            <td>${totalRevenue.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>${(this.props.oneTimeExpense).toFixed(2)}</td>
            <td>${(this.props.monthlyExpense).toFixed(2)}</td>
            <td>${totalExpense.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td>${ time_interval_ContributionProfit.toFixed(2)}</td>
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
    </div>
  </div>);
  }
}

export default Totals;
