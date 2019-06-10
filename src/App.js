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
      formInfo: 
        {
          newType: '',
          newName: '',
          newOneTime: '',
          newMonthly: '',
          error: false
        }
    };

    //NOTE: If arrow functions are used, binding isn't necessary anymore
    // this.handleDelete = this.handleDelete.bind(this)
    // this.handleAdd = this.handleAdd.bind(this)

    // // controlled form elements functions
    // this.handleTypeChange = this.handleTypeChange.bind(this)
    // this.handleNameChange = this.handleNameChange.bind(this)
    // this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    // this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
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

  //NOTE: Modified change event to encompass all changes in form
  // controlled form elements, watch for changes
  handleChange = (e) => {
    console.log(e.target);
    const formInfo = {...this.state.formInfo};
    isNaN(e.target.value) ? formInfo[e.target.name] = e.target.value : formInfo[e.target.name] = Number(e.target.value) ;
    this.setState({
      formInfo
    });
  };

  // add new expense or revenue
  handleAdd = (e) => {
    e.preventDefault()
    // handle form errors, allows one-time and revenue amounts to be 0
    if (!this.state.formInfo.newType || !this.state.formInfo.newName || (!this.state.formInfo.newOneTime && this.state.formInfo.newOneTime !== 0) || (!this.state.formInfo.newMonthly && this.state.formInfo.newMonthly !== 0)) {
      this.setState({
        error: true
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
        monthly: this.state.formInfo.newMonthly
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
        newType: ''
      })
    }
  }

  render() {
    // Calculations for totals
    let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * 12)
    let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * 12)
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

          onAdd = {this.handleAdd} 
          newType = {this.state.newType} 
          newName = {this.state.newName}
          newOneTime = {this.state.newOneTime}
          newMonthly = {this.state.newMonthly}

        />
        <div className="roi-tables">
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
          />
        </div>
      </div>
    );
  }
}

export default App;
