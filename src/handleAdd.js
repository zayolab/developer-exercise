export const handleAdd = (currentState, onSetState) => {
  // handle form errors, allows one-time and revenue amounts to be 0
  if (!currentState.newType || !currentState.newName || (!currentState.newOneTime && currentState.newOneTime !== 0) || (!currentState.newMonthly && this.state.newMonthly !== 0)) {
    return({
      error: true
    });
  }
  // if there are no form errors, add accordingly
  else {
    // typeOfAmount will be either 'expenses' or 'revenue'
    let typeOfAmount = currentState.newType
    let monthly = typeOfAmount === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
    let oneTime = typeOfAmount === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'
    // grab state array of revenues or expenses
    let items = currentState[typeOfAmount]
    items.push({
      name: currentState.newName,
      oneTime:currentState.newOneTime,
      monthly:currentState.newMonthly
    })
    // set state with new totals and items array, clear errors displaying and form contents
    return ( {
      error: false,
      [typeOfAmount]: items,
      [monthly]: currentState[monthly] + currentState.newMonthly,
      [oneTime]: currentState[oneTime] + currentState.newOneTime,
      //  Clear values in form
      newName: '',
      newMonthly: '',
      newOneTime: '',
      newType: ''
    });
  }
}