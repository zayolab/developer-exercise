import React from "react"
import PropTypes from "prop-types"
import "./totalstable.css"

const getOneTime = list =>
  list.reduce((acc, item) => acc + Number(item.one_time), 0)
const getMonthly = list =>
  list.reduce((acc, item) => acc + Number(item.monthly), 0)

const TotalsTable = ({ revenue, expenses }) => {
  /* *** CHANGE THIS FOR VARIABLE TIME PERIOD *** */
  const oneTimeRevenue = getOneTime(revenue)
  const monthlyRevenue = getMonthly(revenue)
  const oneTimeExpense = getOneTime(expenses)
  const monthlyExpense = getMonthly(expenses)

  // Calculations for totals
  let totalRevenue = oneTimeRevenue + monthlyRevenue * 12
  let totalExpense = oneTimeExpense + monthlyExpense * 12
  let monthlyContributionProfit = monthlyRevenue - monthlyExpense
  let totalContributionProfit = totalRevenue - totalExpense

  // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
  let contributionMargin =
    totalRevenue !== 0
      ? ((totalContributionProfit / totalRevenue) * 100).toFixed(0)
      : 0

  // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
  let capitalROI =
    totalExpense === 0 && totalRevenue === 0
      ? 0
      : ((oneTimeExpense - oneTimeRevenue) / monthlyContributionProfit).toFixed(
          1
        )

  return (
    <table className="totals-table">
      <thead>
        <tr>
          <th />
          <th>One-Time</th>
          <th>Monthly</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Revenue</td>
          <td>${oneTimeRevenue.toFixed(2)}</td>
          <td>${monthlyRevenue.toFixed(2)}</td>
          <td>${totalRevenue.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Expenses</td>
          <td>${oneTimeExpense.toFixed(2)}</td>
          <td>${monthlyExpense.toFixed(2)}</td>
          <td>${totalExpense.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Contribution Profit</td>
          <td />
          <td>${monthlyContributionProfit.toFixed(2)}</td>
          <td>${totalContributionProfit.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Contribution Margin</td>
          <td />
          <td />
          <td>{contributionMargin}%</td>
        </tr>
        <tr>
          <td>Capital ROI (monthly)</td>
          <td />
          <td />
          <td>{capitalROI}</td>
        </tr>
      </tbody>
    </table>
  )
}

TotalsTable.propTypes = {
  revenue: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired
}

export default TotalsTable
