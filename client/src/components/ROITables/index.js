import React from "react"
import PropTypes from "prop-types"
import ContentTable from "../ContentTable"
import TotalsTable from "../TotalsTable"
import TableRow from "../TableRow"
import "./roitable.css"

const ROITables = ({ revenue, expenses, handleDelete, timePeriod }) => {
  let revenueTableData = revenue.map(item => (
    <TableRow
      type="revenue"
      key={item.id}
      item={item}
      handleDelete={handleDelete}
    />
  ))

  let expensesTableData = expenses.map(expense => (
    <TableRow
      type="expenses"
      key={expense.id}
      item={expense}
      handleDelete={handleDelete}
    />
  ))

  return (
    <div className="roi-tables">
      <ContentTable type="revenue" data={revenueTableData} />
      <ContentTable type="expenses" data={expensesTableData} />
      <TotalsTable
        revenue={revenue}
        expenses={expenses}
        timePeriod={timePeriod}
      />
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
