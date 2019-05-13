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

  // get initial data
  componentDidMount() {
    // initial value
    fetch('http://localhost:3001')
      .then((res) => {
        if(res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(result => this.setState({
        revenue:result[0].revenue,
        expenses: result[0].expenses,
        oneTimeRevenue: result[0].oneTimeRevenue,
        oneTimeExpense: result[0].oneTimeExpense,
        monthlyRevenue: result[0].monthlyRevenue,
        monthlyExpense: result[0].monthlyExpense,
        newType: '',
        newName: '',
        newOneTime: '',
        newMonthly: '',
        error: false
      }))
      .catch((err) => console.log(err));
  }

  // Delete expense or revenue from list
  handleDelete(type, index) {
    // create body
    const deleteItem = {
      type: type,
      index: index
    }

    // delete item
    fetch('http://localhost:3001/delete', {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(deleteItem)
    })
      .then((res) => {
        if(res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(result => this.setState({
          revenue:result[0].revenue,
          expenses: result[0].expenses,
          oneTimeRevenue: result[0].oneTimeRevenue,
          oneTimeExpense: result[0].oneTimeExpense,
          monthlyRevenue: result[0].monthlyRevenue,
          monthlyExpense: result[0].monthlyExpense
        }))
      .catch((err)=> console.log(err))
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
      // create body
      const addItem = {
        type: this.state.newType,
        name: this.state.newName,
        oneTime:this.state.newOneTime,
        monthly: this.state.newMonthly
      }

      // post add item
      fetch('http://localhost:3001/add', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(addItem)
      })
        .then((res) => {
          if(res.ok) {
            return res.json()
          } else {
            throw new Error()
          }
        })
        .then(result => this.setState({
            revenue:result[0].revenue,
            expenses: result[0].expenses,
            oneTimeRevenue: result[0].oneTimeRevenue,
            oneTimeExpense: result[0].oneTimeExpense,
            monthlyRevenue: result[0].monthlyRevenue,
            monthlyExpense: result[0].monthlyExpense,
            newType: '',
            newName: '',
            newOneTime: '',
            newMonthly: '',
            error: false
          }))
        .catch((err)=> console.log(err))
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
