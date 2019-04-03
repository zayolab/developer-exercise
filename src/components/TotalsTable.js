import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './../App.css';

class TotalsTable extends Component {
    render() {
        const{ 
            oneTimeRevenue, monthlyRevenue, totalRevenue, oneTimeExpense, monthlyExpense, totalExpense,
            monthlyContributionProfit, totalContributionProfit, contributionMargin, capitalROI
        } = this.props;
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
        );
    };
}

export default TotalsTable;