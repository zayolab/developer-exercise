import React from 'react'

const Expense = ({oneTimeExpenseState, monthlyExpenseState, totalExpenseState}) => {
  return (
    
      <tr>
        <td>Expenses</td>
        <td>${ ( oneTimeExpenseState ).toFixed(2) }</td>
        <td>${ ( monthlyExpenseState ).toFixed(2) }</td>
        <td>${ totalExpenseState.toFixed(2) }</td>
      </tr>

  )
}

export default Expense
