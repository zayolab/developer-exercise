import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Table
 } from 'react-bootstrap'
import './App.css';
import Input from './components/inputNewLineItem/Input';
import Revenue from './components/revenue/Revenue';
import Expenses from './components/expenses/Expenses';
import Totals from './components/totals/Totals';
import ChangeTerms from './components/changeTerms/ChangeTerms';




class App extends Component {
  constructor() { //Constructor not needed anymore (automatically included in newer versions of Babel)
    super()
    // "seed" data initially
    this.state = {
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
      }],
      expenses:[{
        name: 'Expense 1',
        oneTime: 500,
        monthly: 20.00
      },
      {
        name: 'Expense 2',
        oneTime: 200,
        monthly: 40
      }],
      oneTimeRevenue: 175,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60,
      newTerm: 12,
      formError: false,
      formInfo: 
        {
          newType: '',
          newName: '',
          newOneTime: '',
          newMonthly: '',
        }
    };
    // --> NOTE: If arrow functions are used, binding isn't necessary anymore, binding taken out
  }

  // Delete expense or revenue from list
  handleDelete = (type, index) => {
    // listType will be 'expenses' or 'revenue' depending on item to delete
    let listType = this.state[type]
    // recalculate and set totals in state
    if (type === 'expenses') {
      this.setState({
        oneTimeExpense: this.state.oneTimeExpense - this.state.expenses[index]['oneTime'],
        monthlyExpense: this.state.monthlyExpense - this.state.expenses[index]['monthly'],
      })
    } else {
      // for revenue
      this.setState({
        oneTimeRevenue: this.state.oneTimeRevenue - this.state.revenue[index]['oneTime'],
        monthlyRevenue: this.state.monthlyRevenue - this.state.revenue[index]['monthly'],
      })
    }
    // remove list item from state array
    this.setState({
      [listType]: listType.splice(index, 1),
    })
  }

  handleTermChange = (e) => {
    console.log(e.target.value);
    this.setState({
      newTerm: Number(e.target.value)
    })
  }

  // controlled form elements, watch for changes
  // --> NOTE: Modified the change event to encompass all present changes in form
  handleChange = (e) => {
    console.log(e.target);
    const formInfo = {...this.state.formInfo} // --> NOTE: Best practice to make a copy of data b/f manipulating
    isNaN(e.target.value) ? formInfo[e.target.name] = e.target.value : formInfo[e.target.name] = Number(e.target.value); 
    this.setState({
      formInfo
    })
  }

  // add new expense or revenue
  handleAdd = (e) => {
    e.preventDefault()
    let newType = this.state.formInfo.newType
    let newTerm = this.state.formInfo.newTerm
    let newName = this.state.formInfo.newName
    let newOneTime = this.state.formInfo.newOneTime
    let newMonthly = this.state.formInfo.newMonthly
    // handle form errors, allows one-time and revenue amounts to be 0
    if (!newType || !newName || (!newOneTime && newOneTime !== 0) || (!newMonthly && newMonthly !== 0)) {
      this.setState({
        formError: true
      })
    }
    // if there are no form errors, add accordingly
    else {
      // typeOfAmount will be either 'expenses' or 'revenue'
      let typeOfAmount = this.state.formInfo.newType
      let monthly = typeOfAmount === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
      let oneTime = typeOfAmount === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'
      // grab state array of revenues or expenses
      let items = this.state[typeOfAmount]
      items.push({
        name: this.state.formInfo.newName,
        oneTime:this.state.formInfo.newOneTime,
        monthly: this.state.formInfo.newMonthly,
        term: this.state.formInfo.newTerm
      })
      // set state with new totals and items array, clear errors displaying and form contents
      this.setState({
        error: false,
        [typeOfAmount]: items,
        [monthly]: this.state[monthly] + this.state.formInfo.newMonthly,
        [oneTime]: this.state[oneTime] + this.state.formInfo.newOneTime,
        //  Clear values in form
        newName: '',
        newMonthly: '',
        newOneTime: '',
        newType: '',
        newTerm: 12
      })
    }
  }

  calculateTotals = () => {
     }

  calculateNewTerms = () => {

  }

  render() {
     // Calculations for totals
     let newTerm = this.state.newTerm
     let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * newTerm)
     let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * newTerm)
     let monthlyContributionProfit = this.state.monthlyRevenue - this.state.monthlyExpense
     let totalContributionProfit = totalRevenue - totalExpense
     // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
     let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0
     // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
     let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)
 

    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        <Input 
          handleChange = {this.handleChange}
          formInfo = {this.state.formInfo}
          formError = {this.state.formError}
          onAdd = {this.handleAdd} 
        />
        <div className = "roi-tables">
          <Revenue 
            revenue = {this.state.revenue} 
            oneTimeRevenue = {this.state.oneTimeRevenue} 
            handleDelete = {this.handleDelete}
          />
          <Expenses 
            expenses = {this.state.expenses} 
            oneTimeExpense = {this.state.monthlyExpense}
            handleDelete = {this.handleDelete}
          />
          <Totals 
            oneTimeRevenue = {this.state.oneTimeRevenue}
            monthlyRevenue = {this.state.monthlyRevenue}
            oneTimeExpense = {this.state.oneTimeExpense}
            monthlyExpense = {this.state.monthlyExpense}
            totalRevenue = {totalRevenue}
            totalExpense = {totalExpense}
            totalContributionProfit = {totalContributionProfit}
            monthlyContributionProfit = {monthlyContributionProfit}
            contributionMargin = {contributionMargin}
            capitalROI = {capitalROI}
            newTerm = {this.state.newTerm}
          />
        </div>
        <ChangeTerms  
          newTerm = {this.state.newTerm}
          handleTermChange = {this.handleTermChange}
        />
      </div>
    );
  }
}

export default App;
