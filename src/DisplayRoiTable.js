import React, { Component } from 'react';
import './App.css'

export class DisplayRoiTable extends Component {

  constructor (props) {
    super(props);

    this.state = {
      revenueData: props.revenueData,
      expensesData: props.expensesData,
      oneTimeRevenue: props.oneTimeRevenue,
      monthlyRevenue: props.monthlyRevenue,
      totalRevenue: props.totalRevenue,
      oneTimeExpense: props.oneTimeExpense,
      monthlyExpense: props.monthlyExpense,
      totalExpense: props.totalExpense,
      monthlyProfit: props.monthlyProfit,
      totalProfit: props.totalProfit,
      margin: props.margin,
      roi: props.roi
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps !== prevState) {
      return {
        revenueData: nextProps.revenueData,
        expensesData: nextProps.expensesData,
        oneTimeRevenue: nextProps.oneTimeRevenue,
        monthlyRevenue: nextProps.monthlyRevenue,
        totalRevenue: nextProps.totalRevenue,
        oneTimeExpense: nextProps.oneTimeExpense,
        monthlyExpense: nextProps.monthlyExpense,
        totalExpense: nextProps.totalExpense,
        monthlyProfit: nextProps.monthlyProfit,
        totalProfit: nextProps.totalProfit,
        margin: nextProps.margin,
        roi: nextProps.roi
      };
    }
  }

  render () {
    return (
      <div className="roi-tables">
        {/* Display Revenue Table */}
        <table className="revenue-table">
          <thead>
            <tr>
              <th>Revenue</th>
            </tr>
            <tr>
              <th></th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.revenueData}
          </tbody>
        </table>
        {/* Display Expenses Table */}
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Expenses</th>
            </tr>
            <tr>
              <th></th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.expensesData}
          </tbody>
        </table>
        {/* Display Totals Table */}
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
              <td>${this.state.oneTimeRevenue.toFixed(2)}</td>
              <td>${this.state.monthlyRevenue.toFixed(2)}</td>
              <td>${this.state.totalRevenue.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>${this.state.oneTimeExpense.toFixed(2)}</td>
              <td>${this.state.monthlyExpense.toFixed(2)}</td>
              <td>${this.state.totalExpense.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Contribution Profit</td>
              <td></td>
              <td>${this.state.monthlyProfit.toFixed(2)}</td>
              <td>${this.state.totalProfit.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Contribution Margin</td>
              <td></td>
              <td></td>
              <td>{this.state.margin}%</td>
            </tr>
            <tr>
              <td>Capital ROI (monthly)</td>
              <td></td>
              <td></td>
              <td>{this.state.roi}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
