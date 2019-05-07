import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './MainPage.css';

import Revenue from './Revenue';
import Expenses from './Expenses';
import Totals from './Totals';


export default class MainPage extends Component {


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
      totalData:
      {
      year: 1,
      oneTimeRevenue: 175,
      oneTimeExpense: 700,
      monthlyRevenue: 160,
      monthlyExpense: 60,
      totalRevenue: 2095,
      totalExpense: 1420,
      monthlyContributionProfit:100,
      totalContributionProfit:675,
      contributionMargin:32,
      capitalROI:5.3
    },
      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: '',
      error: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.calculate = this.calculate.bind(this)

    // controlled form elements functions
    this.handleYearChange = this.handleYearChange.bind(this)

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
  }


  // Delete expense or revenue from list
  handleDelete(type, index) {

    // listType will be 'expenses' or 'revenue' depending on item to delete
     let listType = this.state[type]
     let totals = this.state.totalData
     let monthly = type === 'expenses' ? 'monthlyExpense' : 'monthlyRevenue'
     let oneTime = type === 'expenses' ? 'oneTimeExpense' : 'oneTimeRevenue'



        totals[monthly]= totals[monthly] - this.state[type][index]['monthly']//monthly revenue and total revenue and contr margin
        totals[oneTime]= totals[oneTime] - this.state[type][index]['oneTime']

    // remove list item from state array
    this.setState({
      totalData: totals,
      [listType]: listType.splice(index, 1),
    })
    this.calculate();
  }

  // controlled form elements, watch for changes
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

    handleYearChange(e) {

      let temp = this.state.totalData

      if(Number(e.target.value) <=999 && e.target.value >0){

        temp.year = Number(e.target.value)

    } else {

        temp.year = 1

}
    this.setState({
      totalData: temp
    })

    this.calculate();

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
      let totals = this.state.totalData
      // grab state array of revenues or expenses
      let items = this.state[typeOfAmount]
      items.push({
        name: this.state.newName,
        oneTime:this.state.newOneTime,
        monthly: this.state.newMonthly
      })

        totals[monthly]= totals[monthly] + this.state.newMonthly //monthly revenue and total revenue and contr margin
        totals[oneTime]= totals[oneTime] + this.state.newOneTime
      // set state with new totals and items array, clear errors displaying and form contents
      this.setState({

        totalData: totals,

        error: false,
        [typeOfAmount]: items,

        //  Clear values in form
        newName: '',
        newMonthly: '',
        newOneTime: '',
        newType: ''
      })
      this.calculate();
    }
  }

  calculate(){


    let newdata = this.state.totalData

    newdata.totalRevenue = newdata.oneTimeRevenue + (newdata.monthlyRevenue * 12 * newdata.year)
    newdata.totalExpense= newdata.oneTimeExpense + (newdata.monthlyExpense * 12 * newdata.year)
    newdata.monthlyContributionProfit= newdata.monthlyRevenue -newdata.monthlyExpense
    newdata.totalContributionProfit= newdata.totalRevenue - newdata.totalExpense
    // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
    newdata.contributionMargin= newdata.totalRevenue !== 0 ? (newdata.totalContributionProfit / newdata.totalRevenue * 100).toFixed(0) : 0 // good
    // handle case where monthlyContributionProfit=0 or oneTimeExpense = oneTimeRevenue (to avoid NaN and Infinity)
    newdata.capitalROI= ((newdata.monthlyContributionProfit === 0) || (newdata.oneTimeExpense === newdata.oneTimeRevenue)) ? 0 : ((newdata.oneTimeExpense - newdata.oneTimeRevenue) / newdata.monthlyContributionProfit).toFixed(1)
  


    this.setState({
    totalData: newdata
})

}

  render() {


    return (
      <div>
        <h1 className="text-center">ROI Calculator</h1>
        {/* Add new expense or revenue form */}
        <Form className="addExpenseOrRevenueForm" onSubmit={this.handleAdd}>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control
                as="select"
                onChange = {this.handleTypeChange}
                value={this.state.newType ? this.state.newType : 'choose'}
                >
                <option value="choose" disabled={true}>Select Type</option>
                <option value="revenue">Revenue</option>
                <option value="expenses">Expense</option>
              </Form.Control>
            </Col>
            <Col sm={3} className="input-field">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange = {this.handleNameChange}
                value={this.state.newName ? this.state.newName : ''}
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="One-Time Amount"
                onChange = {this.handleOneTimeChange}
                step="0.01"
                min="0"
                value={(this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : ''} 
              />
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="Monthly Amount"
                onChange = {this.handleMonthlyChange}
                step="0.01"
                min="0"
                value={(this.state.newMonthly || this.state.newMonthly === 0) ? this.state.newMonthly : ''} 
              />
            </Col>
            <Col sm={1} className="add-form-button">
              <Button type="submit">
                Add
              </Button>
            </Col>
          </Row>



        </Form>
        {/* form errors */}
        { this.state.error &&
          <h4 className="error text-center">Please fill out all fields</h4>
        }
        <div className="roi-tables">


          {/* Revenue Table */}

          <Revenue revenue={this.state.revenue} handleDelete={this.handleDelete}></Revenue>


          {/* Expenses Table */}

          <Expenses expenses={this.state.expenses} handleDelete={this.handleDelete}></Expenses>


        {/* Year input */}

  <div className="yearForm">
      <Row >
      <Col>
          <th>Time in Years: </th>
          </Col>
          <Col md={5}>
          <Form>
              <Form.Control
                type="number"
                placeholder="1"
                onChange = {this.handleYearChange}
                step="1"
                min="1"
                value={this.state.totalData.year && this.state.totalData.year <= 999 ? this.state.totalData.year : '1'} 
              />

        </Form>
        </Col>
        </Row>
        </div>


          {/* Totals Table */}
          
          <Totals totalData={this.state.totalData} ></Totals>


        </div>
      </div>
    );
  }
}

