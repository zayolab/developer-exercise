import React, { Component } from 'react';
import './Data.css';

class Calculations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthTerm: 24
    }
  }

  render() {
    const { monthTerm } = this.state;
    const { revenue, expenses } = this.props;

    // Calculations for totals
    let oneTimeRevenue = revenue.reduce(function (prev, cur) {
      return prev + cur.oneTime;
    }, 0);

    let oneTimeExpense = expenses.reduce(function (prev, cur) {
      return prev + cur.oneTime;
    }, 0);

    let monthlyRevenue = revenue.reduce(function (prev, cur) {
      return prev + cur.monthly;
    }, 0);

    let monthlyExpense = expenses.reduce(function (prev, cur) {
      return prev + cur.monthly;
    }, 0);

    let totalRevenue = oneTimeRevenue + (monthlyRevenue * monthTerm)
    let totalExpense = oneTimeExpense + (monthlyExpense * monthTerm)
    let monthlyContributionProfit = monthlyRevenue - monthlyExpense
    let totalContributionProfit = totalRevenue - totalExpense
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
    // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
    let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((oneTimeExpense - oneTimeRevenue) / monthlyContributionProfit).toFixed(1)

    return (
      <div>
        <div className="roi-tables">
          {/* Totals Table */}
          <table className="totals-table">
            <thead>
              <tr>
                <th>{monthTerm} Month Term</th>
              </tr>
              <tr>
                <th>Total</th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue</td>
                <td>${(oneTimeRevenue).toFixed(2)}</td>
                <td>${(monthlyRevenue).toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${(oneTimeExpense).toFixed(2)}</td>
                <td>${(monthlyExpense).toFixed(2)}</td>
                <td>${totalExpense.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Profit</td>
                <td></td>
                <td>${monthlyContributionProfit.toFixed(2)}</td>
                <td>${totalContributionProfit.toFixed(2)}</td>
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
      </div>
    );
  }
}

export default Calculations;