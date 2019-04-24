import React from 'react'

function TotalsTable(props) {
  return (
    <div>
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
                <td>${(props.oneTimeRevenue).toFixed(2)}</td>
                <td>${(props.monthlyRevenue).toFixed(2)}</td>
                <td>${props.totalRevenue.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>${(props.oneTimeExpense).toFixed(2)}</td>
                <td>${(props.monthlyExpense).toFixed(2)}</td>
                <td>${props.totalExpense.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Profit</td>
                <td></td>
                <td>${props.monthlyContributionProfit.toFixed(2)}</td>
                <td>${props.totalContributionProfit.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Contribution Margin</td>
                <td></td>
                <td></td>
                <td>{props.contributionMargin}%</td>
              </tr>
              <tr>
                <td>Capital ROI (monthly)</td>
                <td></td>
                <td></td>
                <td>{props.capitalROI}</td>
              </tr>
            </tbody>
          </table>
    </div>
  )
}

export default TotalsTable;