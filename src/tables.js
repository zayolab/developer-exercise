import React, { Component } from 'react';
import './App.css'
import {
  Button
 } from 'react-bootstrap'

class RevenueTable extends Component{
    render(){
    	// create table rows from revenue state list
		let revenueTableData = this.props.revenue.map((item, index) => {
	      return (
	        <tr key={"revenue" + index}>
	          <td>{item.name}</td>
	          <td>${item.oneTime.toFixed(2)}</td>
	          <td>${item.monthly.toFixed(2)}</td>
	          <td><Button onClick={() => this.props.handleDelete('revenue', index)}>Delete</Button></td>
	        </tr>
	      )
	    })
	    return(
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
              {revenueTableData}
            </tbody>
          </table>);
    }
};

class ExpenseTable extends Component{
	render(){
		// create table rows from expenses state list
	    let expensesTableData = this.props.expense.map((expense, index) => {
	      return (
	        <tr key={"expense" + index}>
	          <td>{expense.name}</td>
	          <td>${expense.oneTime.toFixed(2)}</td>
	          <td>${expense.monthly.toFixed(2)}</td>
	          <td><Button onClick={() => this.props.handleDelete('expenses', index)}>Delete</Button></td>
	        </tr>
	      )
	    })
	    return(
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
	              {expensesTableData}
	            </tbody>
	          </table>);
	}
};

class TotalsTable extends Component{
	render(){
		// Calculations for totals
		let totalRevenue = this.props.oneTimeRevenue + (this.props.monthlyRevenue * this.props.term)
	    let totalExpense = this.props.oneTimeExpense + (this.props.monthlyExpense * this.props.term)
	    let monthlyContributionProfit = this.props.monthlyRevenue - this.props.monthlyExpense
	    let totalContributionProfit = totalRevenue - totalExpense
	    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
	    let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
	    // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
	    let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.props.oneTimeExpense - this.props.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)
		return(
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
                <td>${(this.props.oneTimeRevenue).toFixed(2)}</td>
                <td>${(this.props.monthlyRevenue).toFixed(2)}</td>
                <td>${(totalRevenue).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${this.props.oneTimeExpense.toFixed(2)}</td>
                <td>${this.props.monthlyExpense.toFixed(2)}</td>
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
          );
	}

};
export{
	ExpenseTable,
	RevenueTable,
	TotalsTable
}