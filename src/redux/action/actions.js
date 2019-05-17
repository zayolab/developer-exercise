import { ADD_REVENUE,
	ADD_EXPENSE, 
	DELETE_REVENUE, 
	DELETE_EXPENSE,
	EDIT_REVENUE,
	EDIT_EXPENSE, 
	TOTALS, 
	UPDATE_MONTH_TERM, 
	RESULTS, 
	FETCH_RESULTS_BEGIN, 
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE
} from './actionTypes'

export const addRevenue = item => ({
	type: ADD_REVENUE,
	payload: {
		item
	}
});

export const addExpense = item => ({
	type: ADD_EXPENSE,
	payload: {
		item
	}
});

export const deleteRevenue = index => ({
	type: DELETE_REVENUE,
	payload: {
		index
	}
});

export const deleteExpense = index => ({
	type: DELETE_EXPENSE,
	payload: {
		index
	}
});

export const editRevenue = (item,index) => ({
	type: EDIT_REVENUE,
	payload: {
		index,
		item
	}
});

export const editExpense = (item,index) => ({
	type: EDIT_EXPENSE,
	payload: {
		index,
		item
	}
});

export const totals = (revenueItems,expensesItems) => ({
	type: TOTALS,
	payload: {
		revenueItems,
		expensesItems
	}
});

export const updateMonthTerm = monthTerm => ({
	type: UPDATE_MONTH_TERM,
	payload: {
		monthTerm
	}
});

export const getResults = result => ({
	type: RESULTS,
		payload: {
	result
	}
});

export function resultsHasErrored(bool) {
	return {
		type: FETCH_RESULTS_FAILURE,
		hasErrored: bool
	};
}

export function resultsIsLoading(bool) {
	return {
		type: FETCH_RESULTS_BEGIN,
		isLoading: bool
	};
}

export function resultsFetchDataSuccess(results,isLoaded) {
	return {
		type: FETCH_RESULTS_SUCCESS,
		results,
		isLoaded
	};
}

export function resultsFetchData(total) {
	return (dispatch) => {
		dispatch(resultsIsLoading(true));

		fetch("http://localhost:9000/v1/results", {
			method: 'POST',
			body: JSON.stringify({ total }),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		})
		.then((response) => response.json())
		.then((results) => dispatch(resultsFetchDataSuccess(results,true)))
		.catch(() => dispatch(resultsHasErrored(true)));
	};
}