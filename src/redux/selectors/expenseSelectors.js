export const getItemState = store => store.expenseItems;


export const getExpense = store =>
	getItemState(store) ? getItemState(store).expenses : [];

export const getExpenseById = (store, id) =>
  getItemState(store) ? { ...getItemState(store).expenses[id], id } : {};

export const getExpenseItem = store =>
	getExpense(store).map(id => getExpenseById(store, id));

export const getExpenseList = store => {
	const expenseItems = getExpenseItem(store);
	return expenseItems;
}


