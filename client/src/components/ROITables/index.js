import React from "react"
import ContentTable from "../ContentTable"
import TotalsTable from "../TotalsTable"
import TableRow from "../TableRow"
import "./roitable.css"

const ROITables = ({ revenue, expenses, handleDelete }) => {
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

  return revenue.length > 0 && expenses.length > 0 ? (
    <div className="roi-tables">
      <ContentTable type="revenue" data={revenueTableData} />
      <ContentTable type="expenses" data={expensesTableData} />
      <TotalsTable revenue={revenue} expenses={expenses} />
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default ROITables
