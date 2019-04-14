import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {capitalize} from "./helper.js";

/**
 * Class representing an account ledger with one-time and monthly revenue/expenses
 * Constructor arguments:
 * name: The name of the table
 * type: 'revenue' or 'expenses'
 */
export class ledger {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.entries = [];
        this.oneTimeTotal = 0;
        this.monthlyTotal = 0;

        // bind class methods
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // Delete expense or revenue from list
    deleteItem(index) {
        // recalculate totals
        this.oneTimeTotal -= this.entries[index]['oneTime'];
        this.monthlyTotal -= this.entries[index]['monthly'];

        // remove list item from entries
        this.entries.splice(index, 1);
    }

    /**
     * Add new expense or revenue
     * Form values are validated in App.js, so we don't need to check here.
     */
    addItem(formName, formOneTime, formMonthly) {
        // add new data to entries array
        this.entries.push({
            name: formName,
            oneTime: formOneTime,
            monthly: formMonthly
        });

        // update oneTime and monthly
        this.oneTimeTotal += formOneTime;
        this.monthlyTotal += formMonthly;
    }
}

/**
 * Component for a table representing the values in a ledger
 * Properties:
 * index: The index (in the concatenated list of ledgers) of the ledger in App.js
 * ledger: The ledger object which holds the investments/accounts
 * deleteItemCallback: The function to call when a row in the ledger is deleted
 * deleteLedgerCallback: The function to call when the ledger itself is deleted
 */
export class LedgerTable extends Component {
    render() {
        let ledger = this.props.ledger;
        let tableName = ledger.name;
        let tableData = ledger.entries.map((item, index) => {
            return (
                    <tr key={tableName + index}>
                    <td>{item.name}</td>
                    <td>${item.oneTime.toFixed(2)}</td>
                    <td>${item.monthly.toFixed(2)}</td>
                    <td><Button onClick={() => this.props.deleteItemCallback(ledger, index)}>Delete Item</Button></td>
                    </tr>
            );
        });

        return (
                <table className={ledger.type + "-table"}>
                <thead>
                <tr>
                <th>{tableName}</th>
                <td></td>
                <td></td>
                <td><Button onClick={() => this.props.deleteLedgerCallback(this.props.index)}>Delete Ledger</Button></td>
                </tr>
                <tr>
                <th></th>
                <th>One-Time</th>
                <th>Monthly</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                {/* Fill the rows with ledger data */}
                {tableData}
                </tbody>
                </table>
        )
    }
}
