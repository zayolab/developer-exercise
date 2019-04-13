import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Form
} from 'react-bootstrap';
import {ledger, LedgerTable} from "./ledger.js";
import TotalsTable from "./totals.js";
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            newType: '',
            newName: '',
            newOneTime: '',
            newMonthly: '',
            error: false
        }
        this.revenue = new ledger();
        this.expenses = new ledger();

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        // controlled form elements functions
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOneTimeChange = this.handleOneTimeChange.bind(this);
        this.handleMonthlyChange = this.handleMonthlyChange.bind(this);
    }

    // controlled form elements, watch for changes
    handleTypeChange(e) {
        this.setState({
            newType: e.target.value
        });
    }
    handleNameChange(e) {
        this.setState({
            newName: e.target.value
        });
    }

    handleMonthlyChange(e) {
        this.setState({
            newMonthly: Number(e.target.value)
        });
    }
    handleOneTimeChange(e) {
        this.setState({
            newOneTime: Number(e.target.value)
        });
    }

    // Delete expense or revenue from list
    handleDelete(type, index) {
        // listType will be 'expenses' or 'revenue' depending on item to delete
        let ledger = this[type];
        ledger.deleteItem(index);
        this.forceUpdate(); //Since we don't set any state for this, the page doesn't otherwise refresh after deletion
    }

    // add new expense or revenue
    handleAdd(e) {
        e.preventDefault();
        // handle form errors, allows one-time and revenue amounts to be 0
        if (!this.state.newType || !this.state.newName || (!this.state.newOneTime && this.state.newOneTime !== 0) || (!this.state.newMonthly && this.state.newMonthly !== 0)) {
            this.setState({
                error: true
            });
        }
        // if there are no form errors, add accordingly
        else {
            // typeOfAmount will be either 'expenses' or 'revenue'
            // grab state revenues or expenses ledger
            let ledger = this[this.state.newType];
            ledger.addItem(this.state.newName, this.state.newOneTime, this.state.newMonthly);
            // set state with new totals and items array, clear errors displaying and form contents
            this.setState({
                error: false,
                //  Clear values in form
                newName: '',
                newMonthly: '',
                newOneTime: '',
                newType: ''
            });
        }
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
                <LedgerTable name="revenue" ledger={this.revenue} deleteCallback={this.handleDelete} />
                {/* Expenses Table */}
                <LedgerTable name="expenses" ledger={this.expenses} deleteCallback={this.handleDelete} />
                {/* Totals Table */}
                <TotalsTable revenueLedger={this.revenue} expensesLedger={this.expenses} />
                </div>
                </div>
    );
  }
}

export default App;
