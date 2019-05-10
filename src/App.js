import React, { Component } from 'react';
import {
  Row,
  Col,
  Form
 } from 'react-bootstrap'
import './App.css';

import Buttons from './components/Buttons';
import {Table} from './components/Tables';
import {Calculation} from './calculations';

class App extends Component {
  constructor() {
    super()
    // "seed" data initially >>> move to server/back
    this.state = {revenue: null}

    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)

    // controlled form elements functions
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
  }

  // fetch data
  componentDidMount() {
    // initial value
    fetch('http://localhost:3001')
      .then(res => res.json())
      .then(result => this.setState({
        revenue:result[0].revenue,
        expenses: result[0].expenses,
        oneTimeRevenue: result[0].oneTimeRevenue,
        oneTimeExpense: result[0].oneTimeExpense,
        monthlyRevenue: result[0].monthlyRevenue,
        monthlyExpense: result[0].monthlyExpense,
        newType: result[0].newType,
        newName: result[0].newName,
        newOneTime: result[0].newOneTime,
        newMonthly: result[0].newMonthly,
        error: false
      }))
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
    // block render untill setState call
    if (!this.state.revenue) {
      return <div />
    }
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
              <Buttons />
            </Col>
          </Row>
        </Form>
        {/* form errors */}
        { this.state.error &&
          <h4 className="error text-center">Please fill out all fields</h4>
        }
        <div className="roi-tables">
          {/* Revenue Table */}
          <Table data={this.state.revenue} handleClick={this.handleDelete}
          value={'revenue'}/>

          {/* Expenses Table */}
          <Table data={this.state.expenses} handleClick={this.handleDelete}
          value={'expenses'}/>

          {/* Totals Table */}
          <Calculation data={this.state}/>
        </div>
      </div>
    );
  }
}

export default App;
