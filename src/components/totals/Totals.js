import React, { Component } from 'react'; 
import {
  Row,
  Col,
  Button,
  Form,
  Table
 } from 'react-bootstrap'
 import '../../App.css';

class Totals extends Component {

  componentDidUpdate() {
    // let newTerm = this.state.newTerm
    // let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * newTerm)
    console.log("Updated")
  }
     
    //  let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * 12)
    //  let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * 12)
    //  let monthlyContributionProfit = this.state.monthlyRevenue - this.state.monthlyExpense
    //  let totalContributionProfit = totalRevenue - totalExpense
    //  // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    //  let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
    //  // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    //  let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

  render() { 
    return ( 
      <React.Fragment>
          {/* Totals Table */}
          <Table bordered hover className="totals-table">
            <thead>
              <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th>Total for {this.props.newTerm} {this.props.newTerm > 1 ? "months" : "month"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue</td>
                <td>${(this.props.oneTimeRevenue).toFixed(2)}</td>
                <td>${(this.props.monthlyRevenue).toFixed(2)}</td>
                <td>${this.props.totalRevenue.toFixed(2)}</td>
              </tr>
              <tr class="spaceTable">
                <td>Expenses</td>
                <td>${(this.props.oneTimeExpense).toFixed(2)}</td>
                <td>${(this.props.monthlyExpense).toFixed(2)}</td>
                <td>${this.props.totalExpense.toFixed(2)}</td>
              </tr>

              <tr>
                <td>Contribution Profit</td>
                <td></td>
                <td>${ this.props.monthlyContributionProfit.toFixed(2)}</td>
                <td>${ this.props.totalContributionProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Margin</td>
                <td></td>
                <td></td>
                <td>{this.props.contributionMargin}%</td>
              </tr>
              <tr>
                <td>Capital ROI (monthly)</td>
                <td></td>
                <td></td>
                <td>{this.props.capitalROI}</td>
              </tr>
            </tbody>
          </Table>
      </React.Fragment>
    )
  }
}
 
export default Totals;