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
            term: 12, // reflect a 1 year term by default
            newType: '',
            newName: '',
            newOneTime: '',
            newMonthly: '',
            ledgerError: false,
            termError: false
        }
        this.revenue = new ledger();
        this.expenses = new ledger();

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        // controlled form elements functions
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOneTimeChange = this.handleOneTimeChange.bind(this);
        this.handleMonthlyChange = this.handleMonthlyChange.bind(this);
    }

    // controlled form elements, watch for changes
    handleTermChange(e) {
        if(!e.target.value || //check for empty string
           isNaN(e.target.value) || //check for non-numeric string
           e.target.value.indexOf(' ') >= 0) { //check for whitespace in string
            this.setState({
                termError: true
            })
            return false;
        }
        this.setState({
            term: e.target.value,
            termError: false
        });
    }
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
        // type will be 'expenses' or 'revenue' depending on item to delete
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
                ledgerError: true
            });
        }
        // if there are no form errors, add accordingly
        else {
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
       <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
            <p className="font-weight-bold">Investment Term:</p>
                    </Col>
                    <Col className="input-field">
                    <input type="text" placeholder={this.state.term} name="investmentTerm" list="terms" onChange={this.handleTermChange}/>
                    <datalist id="terms">
                        <option value="12">12 Months</option>
                        <option value="24">24 Months</option>
                        <option value="36">36 Months</option>
                        <option value="48">48 Months</option>
                        <option value="60">60 Months</option>
                    </datalist>
            </Col>
            <Col>
            { this.state.termError &&
                <h4 className="error text-center">Investment term must be a number</h4>
            }
            </Col>
        </Row>
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
        { this.state.ledgerError &&
            <h4 className="error text-center">Please fill out all fields</h4>
        }
        <div className="roi-tables">
            {/* Revenue Table */}
            <LedgerTable name="revenue" ledger={this.revenue} deleteCallback={this.handleDelete} />
            {/* Expenses Table */}
            <LedgerTable name="expenses" ledger={this.expenses} deleteCallback={this.handleDelete} />
            {/* Totals Table */}
            <TotalsTable revenueLedger={this.revenue} expensesLedger={this.expenses} term={this.state.term} />
        </div>
    </div>
        );
    }
}

export default App;
