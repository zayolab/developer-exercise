import { TOTALS, UPDATE_MONTH_TERM } from '../action/actionTypes'

const initialState = {
	totals: {
		monthTerm: 12
	}
}

const totals = (state = initialState, action) => {
	switch(action.type) {
		case TOTALS: {
			const oneTimeRevenue = action.payload.revenueItems.revenue.reduce((sum, d) => { return sum + d.oneTime }, 0);
			const oneTimeExpense = action.payload.expensesItems.expenses.reduce((sum, d) =>{ return sum + d.oneTime }, 0);
			const monthlyRevenue = action.payload.revenueItems.revenue.reduce((sum, d) => { return sum + d.monthly }, 0);
			const  monthlyExpense = action.payload.expensesItems.expenses.reduce((sum, d) =>{ return sum + d.monthly }, 0);
			const monthTerm = state.totals.monthTerm;
			
			return {
				...state,
				totals: {
					...state.totals,
					oneTimeRevenue: oneTimeRevenue,
			        oneTimeExpense: oneTimeExpense,
			        monthlyRevenue: monthlyRevenue,
			        monthlyExpense: monthlyExpense,
			        monthTerm: monthTerm
				}
			};
		}
		case UPDATE_MONTH_TERM: {
			return {
				...state,
				totals: {
					...state.totals,
			        monthTerm: parseInt(action.payload.monthTerm)
				}
			};
		}
		default:
			return state;
	}
}

export default totals;