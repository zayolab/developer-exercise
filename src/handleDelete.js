export const handleDelete = (currentState, onSetState, type, index) => {
  // listType will be 'expenses' or 'revenue' depending on item to delete
  let listType = currentState[type]
  // recalculate and set totals in state
  if (type === 'expenses') {
    onSetState({
      oneTimeExpense: currentState.oneTimeExpense - currentState.expenses[index]['oneTime'],
      monthlyExpense: currentState.monthlyExpense - currentState.expenses[index]['monthly'],
    })
  } else {
    // for revenue
    onSetState({
      oneTimeRevenue: currentState.oneTimeRevenue - currentState.revenue[index]['oneTime'],
      monthlyRevenue: currentState.monthlyRevenue - currentState.revenue[index]['monthly'],
    })
  }
  // remove list item from state array
  onSetState({
    [listType]: listType.splice(index, 1),
  })
}