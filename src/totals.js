import React, { Component } from 'react';

/**
 * Component for the totals list
 * Properties:
 * revenueLedgers: The list of ledgers representing revenues
 * expensesLedgers: The list of ledgers representing expenses
 */
export default class TotalsTable extends Component {
    render() {
        // convenient references to application variables
        let revenueLedgers = this.props.revenueLedgers;
        let expenseLedgers = this.props.expenseLedgers;
        let term = this.props.term;

        let oneTimeTotals = {
            revenue: 0,
            expenses: 0
        };
        let monthlyTotals = {
            revenue: 0,
            expenses: 0
        };

        // Calculate one time and monthly totals
        for(const ledger of revenueLedgers) {
            oneTimeTotals.revenue += ledger.oneTimeTotal;
            monthlyTotals.revenue += ledger.monthlyTotal;
        }
        for(const ledger of expenseLedgers) {
            oneTimeTotals.expenses += ledger.oneTimeTotal;
            monthlyTotals.expenses += ledger.monthlyTotal;
        }

        // Calculate variables dependent on one time/monthly revenue/expenses
        let totalRevenue = oneTimeTotals.revenue + (monthlyTotals.revenue * term);
        let totalExpense = oneTimeTotals.expenses + (monthlyTotals.expenses * term);
        let monthlyContributionProfit = monthlyTotals.revenue - monthlyTotals.expenses;
        let totalContributionProfit = totalRevenue - totalExpense;
        // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
        let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0;
        // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
        let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((oneTimeTotals.expenses - oneTimeTotals.revenue) / monthlyContributionProfit).toFixed(1);

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
                <td>${(oneTimeTotals.revenue).toFixed(2)}</td>
                <td>${(monthlyTotals.revenue).toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
                </tr>
                <tr>
                <td>Expenses</td>
                <td>${(oneTimeTotals.expenses).toFixed(2)}</td>
                <td>${(monthlyTotals.expenses).toFixed(2)}</td>
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
