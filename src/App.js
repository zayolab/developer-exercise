import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './App.css';
import {ExpenseTable, RevenueTable, TotalsTable} from './tables.js';
import {HandleNew, HandleTerm} from './handleData.js'

class App extends Component {
  constructor(props) {
    super(props)
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
      term: 12,
      tempterm: '',
      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: '',
      error: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)

    // controlled form elements functions
    this.setTerm = this.setTerm.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
  }


  // Delete expense or revenue from list
  handleDelete(type, index) {
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
  //set the term to the one specified by user
  setTerm(e){
    e.preventDefault()
    //check that a term is selected
    if (this.state.tempterm===''){
      this.setState({
        error: true
      })
    }
    //if there are no errors set term
    else{
      this.setState({
          error:false,
          term: Number(this.state.tempterm),
      })
      this.setState({
        tempterm: ''
      })
    }
  }
  // controlled form elements, watch for changes
  handleTermChange(e){
    this.setState({
      tempterm: e.target.value
    })
  }
  handleTypeChange(e) {
    this.setState({
      newType: e.target.value
    })
  }
  handleNameChange(e) {
    this.setState({
      newName: e.target.value
    })
  }

  handleMonthlyChange(e) {
    this.setState({
      newMonthly: Number(e.target.value)
    })
  }
  handleOneTimeChange(e) {
    this.setState({
      newOneTime: Number(e.target.value)
    })
  }
  // add new expense or revenue
  handleAdd(e) {
    e.preventDefault()
    // handle form errors, allows one-time and revenue amounts to be 0
    if (!this.state.newType || !this.state.newName || (!this.state.newOneTime && this.state.newOneTime !== 0) || (!this.state.newMonthly && this.state.newMonthly !== 0)) {
      this.setState({
        error: true
      })
    }
    // if there are no form errors, add accordingly
    else {
      // typeOfAmount will be either 'expenses' or 'revenue'
      let typeOfAmount = this.state.newType
      let monthly = typeOfAmount === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
      let oneTime = typeOfAmount === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'
      // grab state array of revenues or expenses
      let items = this.state[typeOfAmount]
      items.push({
        name: this.state.newName,
        oneTime:this.state.newOneTime,
        monthly: this.state.newMonthly
      })
      // set state with new totals and items array, clear errors displaying and form contents
      this.setState({
        error: false,
        [typeOfAmount]: items,
        [monthly]: this.state[monthly] + this.state.newMonthly,
        [oneTime]: this.state[oneTime] + this.state.newOneTime,
        //  Clear values in form
        newName: '',
        newMonthly: '',
        newOneTime: '',
        newType: ''
      })
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        {/* Add new expense or revenue form */}
        <HandleNew
          handleAdd={this.handleAdd}
          handleTypeChange={this.handleTypeChange}
          handleMonthlyChange={this.handleMonthlyChange}
          handleOneTimeChange={this.handleOneTimeChange}
          handleNameChange={this.handleNameChange}
          newName={this.state.newName}
          newMonthly={this.state.newMonthly}
          newType={this.state.newType}
          newOneTime={this.state.newOneTime}
          />
        <HandleTerm
          handleTermChange={this.handleTermChange}
          setTerm={this.setTerm}
          tempterm={this.state.tempterm}
          term={this.state.term}
        />
        {/* form errors */}
        { this.state.error &&
          <h4 className="error text-center">Please fill out all fields</h4>
        }
        <div className="roi-tables">
        {/* Revenue Table */}
        <RevenueTable
          handleDelete={this.handleDelete}
          revenue={this.state.revenue}/>
        {/* Expenses Table */}
        <ExpenseTable
          handleDelete={this.handleDelete}
          expense={this.state.expenses}
          />
        {/* Totals Table */}
        <TotalsTable
          oneTimeExpense={this.state.oneTimeExpense}
          monthlyExpense={this.state.monthlyExpense}
          oneTimeRevenue={this.state.oneTimeRevenue}
          monthlyRevenue={this.state.monthlyRevenue}
          term={this.state.term}
          />
        </div>
      </div>
    );
  }
}

export default App;
