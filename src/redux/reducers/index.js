import { combineReducers } from 'redux'
import results from './results'
import totals from './totals'
import revenueItems from './revenueItems'
import expenseItems from './expenseItems'

export default combineReducers({ revenueItems, expenseItems, totals, results });