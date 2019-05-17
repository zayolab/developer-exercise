import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../action/actionTypes'

const initialState = {
      expenses: [
        {
          name: 'Expense 1',
          oneTime: 500,
          monthly: 20.00
        },
        {
          name: 'Expense 2',
          oneTime: 200,
          monthly: 40
        }]
}

const expenseItems = (state = initialState, action) => {
	switch(action.type) {
		case ADD_EXPENSE: {
			const { name, oneTime, monthly} = action.payload.item;
			return {
				...state,
				expenses: [
					...state.expenses,
					{
						name: name,
						oneTime: oneTime,
						monthly: monthly
					}
				]
			};
		}
		case DELETE_EXPENSE: {
			return {
				expenses: [
				...state.expenses.slice(0, action.payload.index),
				...state.expenses.slice(action.payload.index + 1)
				]
			};
		}
		case EDIT_EXPENSE: {
			const { name, oneTime, monthly} = action.payload.item;
			return {
				...state, 
       			expenses: state.expenses.map( (expenses, i) => i === action.payload.index ? 
       				{
       					...expenses, 
       					name: name,
						oneTime: oneTime,
						monthly: monthly
					}: expenses 
				)
			};				
		}
		default:
			return state;
	}
}

export default expenseItems;