import React from "react"
import PropTypes from "prop-types"
import Transactions from "../Transactions"
import Totals from "../Totals"
import TransactionTotalsRow from "../TransactionTotalsRow"
import ContributionMarginRow from "../ContributionMarginRow"
import ContributionProfitRow from "../ContributionProfitRow"
import CapitalROIRow from "../CapitalROIRow"
import {
  getOneTime,
  getMonthly,
  getTotal,
  getContributionProfit,
  getContributionMargin,
  getCapitalROI
} from "../../utils/roiCalc"
import "./roitable.css"

const ROITables = ({ revenue, expenses, handleDelete, timePeriod }) => {
  let oneTimeRevenue = getOneTime(revenue)
  let oneTimeExpense = getOneTime(expenses)
  let monthlyRevenue = getMonthly(revenue)
  let monthlyExpense = getMonthly(expenses)

  let totalRevenue = getTotal(oneTimeRevenue, monthlyRevenue, timePeriod)
  let totalExpense = getTotal(oneTimeExpense, monthlyExpense, timePeriod)

  let monthlyContributionProfit = getContributionProfit(
    monthlyRevenue,
    monthlyExpense
  )

  let totalContributionProfit = getContributionProfit(
    totalRevenue,
    totalExpense
  )

  let contributionMargin = getContributionMargin(
    totalContributionProfit,
    totalRevenue
  )

  let capitalROI = getCapitalROI(
    totalRevenue,
    totalExpense,
    oneTimeRevenue,
    oneTimeExpense,
    monthlyContributionProfit
  )

  return (
    <div className="roi-tables">
      <Transactions
        type="revenue"
        transactions={revenue}
        handleDelete={handleDelete}
      />
      <Transactions
        type="expenses"
        transactions={expenses}
        handleDelete={handleDelete}
      />
      <Totals>
        <TransactionTotalsRow
          title="Revenue"
          oneTime={oneTimeRevenue}
          monthly={monthlyRevenue}
          total={totalRevenue}
        />
        <TransactionTotalsRow
          title="Expenses"
          oneTime={oneTimeExpense}
          monthly={monthlyExpense}
          total={totalExpense}
        />
        <ContributionProfitRow
          monthlyContributionProfit={monthlyContributionProfit}
          totalContributionProfit={totalContributionProfit}
        />
        <ContributionMarginRow contributionMargin={contributionMargin} />
        <CapitalROIRow capitalROI={capitalROI} />
      </Totals>
    </div>
  )
}

ROITables.propTypes = {
  revenue: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  timePeriod: PropTypes.number.isRequired
}

export default ROITables
