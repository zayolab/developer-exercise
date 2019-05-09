import React, { Component } from 'react';

class Calculation extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    // Calculations for totals
    let totalRevenue = this.props.data.oneTimeRevenue + (this.props.data.monthlyRevenue * 12)
    let totalExpense = this.props.data.oneTimeExpense + (this.props.data.monthlyExpense * 12)
    let monthlyContributionProfit = this.props.data.monthlyRevenue - this.props.data.monthlyExpense
    let totalContributionProfit = totalRevenue - totalExpense
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
    // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.props.data.oneTimeExpense - this.props.data.oneTimeRevenue) / monthlyContributionProfit).toFixed(1);

    return (
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
            <td>${(this.props.data.oneTimeRevenue).toFixed(2)}</td>
            <td>${(this.props.data.monthlyRevenue).toFixed(2)}</td>
            <td>${totalRevenue.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>${(this.props.data.oneTimeExpense).toFixed(2)}</td>
            <td>${(this.props.data.monthlyExpense).toFixed(2)}</td>
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
    )
  }
}

export {Calculation};
