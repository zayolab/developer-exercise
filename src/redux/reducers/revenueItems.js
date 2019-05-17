import { ADD_REVENUE, DELETE_REVENUE, EDIT_REVENUE} from '../action/actionTypes'

const initialState = {
	 revenue: [
        {
          name: 'Item 1',
          oneTime: 100,
          monthly: 50
        },
        {
          name: 'Item 2',
          oneTime: 50,
          monthly: 25
        },
        {
          name: 'Item 3',
          oneTime: 25,
          monthly: 85
        }]
}

const revenueItems = (state = initialState, action) => {
	switch(action.type) {
		case ADD_REVENUE: {
			const { name, oneTime, monthly} = action.payload.item;
			return {
				...state,
				revenue: [
					...state.revenue,
					{
						name: name,
						oneTime: oneTime,
						monthly: monthly
					}
				]
			};
		}
		case DELETE_REVENUE: {
			return {
				revenue: [
					...state.revenue.slice(0, action.payload.index),
					...state.revenue.slice(action.payload.index + 1)
				]
			};
		}
		case EDIT_REVENUE: {
			const { name, oneTime, monthly} = action.payload.item;
			return {
				...state, 
       			revenue: state.revenue.map( (revenue, i) => i === action.payload.index ? 
       				{
       					...revenue, 
       					name: name,
						oneTime: oneTime,
						monthly: monthly
					}: revenue 
				)
			};				
		}
		default:
			return state;
	}
}

export default revenueItems;