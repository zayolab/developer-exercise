export const getItemState = store => store.totals;


export const getTotal = store => 
	getItemState(store) ? getItemState(store).totals : {};

export const getTotals = (store, revenueItems, expenseItems) => {
  let totalSum = {
    oneTimeRevenue : revenueItems.revenue.reduce((sum, d) => { return sum + d.oneTime }, 0),
    oneTimeExpense : expenseItems.expenses.reduce((sum, d) =>{ return sum + d.oneTime }, 0),
    monthlyRevenue : revenueItems.revenue.reduce((sum, d) => { return sum + d.monthly }, 0),
    monthlyExpense : expenseItems.expenses.reduce((sum, d) =>{ return sum + d.monthly }, 0),
    monthTerm : store.totals.totals.monthTerm
  }
  store.totals.totals= totalSum;	
  getTotal(store);
}




