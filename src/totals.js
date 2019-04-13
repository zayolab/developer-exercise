import React, { Component } from 'react';

/**
 * Component for the totals list
 * Properties:
 * revenueLedger: The ledger representing revenues
 * expensesLedger: The ledger representing expenses
 */
export default class TotalsTable extends Component {
    render() {
        // convenient references to revenue and expenses ledgers
        let revenue = this.props.revenueLedger;
        let expenses = this.props.expensesLedger;
        let term = this.props.term;

        // Calculations for totals
        let totalRevenue = revenue.oneTimeTotal + (revenue.monthlyTotal * term);
        let totalExpense = expenses.oneTimeTotal + (expenses.monthlyTotal * term);
        let monthlyContributionProfit = revenue.monthlyTotal - expenses.monthlyTotal;
        let totalContributionProfit = totalRevenue - totalExpense;
        // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
        let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0;
        // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
        let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((expenses.oneTimeTotal - revenue.oneTimeTotal) / monthlyContributionProfit).toFixed(1);

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
                <td>${(revenue.oneTimeTotal).toFixed(2)}</td>
                <td>${(revenue.monthlyTotal).toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
                </tr>
                <tr>
                <td>Expenses</td>
                <td>${(expenses.oneTimeTotal).toFixed(2)}</td>
                <td>${(expenses.monthlyTotal).toFixed(2)}</td>
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
}
