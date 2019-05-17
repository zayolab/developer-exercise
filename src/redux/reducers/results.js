import { RESULTS, FETCH_RESULTS_BEGIN, FETCH_RESULTS_SUCCESS, FETCH_RESULTS_FAILURE } from '../action/actionTypes'

const initialState = {
	results: {},
	loading: false,
	error: null,
	isLoaded: false
}

export default function (state = initialState, action) {
	switch(action.type) {
		case RESULTS: {
			const { 
				totalRevenue, 
				totalExpense, 
				monthlyContributionProfit, 
				totalContributionProfit, 
				contributionMargin, 
				capitalROI
			} = action.payload;
			return {
				...state,
				results: {
					...state.results,
					totalRevenue: totalRevenue,
			        totalExpense: totalExpense,
			        monthlyContributionProfit: monthlyContributionProfit,
			        totalContributionProfit: totalContributionProfit,
			        contributionMargin: contributionMargin,
			        capitalROI: capitalROI
				}
			};
		}
		case FETCH_RESULTS_BEGIN: {
			return {
		        ...state,
		        loading:  action.isLoading,
		        error: null,
		        isLoaded: false
     		};
		}
	    case FETCH_RESULTS_SUCCESS: {
		    return {
		        ...state,
		        loading: false,
		        results: action.results,
		        isLoaded: action.isLoaded
		    };
		}
	    case FETCH_RESULTS_FAILURE: {     
		    return {
		        ...state,
		        loading: false,
		        error: action.hasErrored,
		        results: {}
		    };
	    }
		default:
			return state;
	}
}