import React, { Component } from 'react';

import './App.css';

class Expenses extends React.Component{

    constructor(props) {

        super(props);



    }
    


    render() {

        return(
        <table className="expenses-table">
            <thead>
                <tr>
                    <th>Expenses</th>
                </tr>
                <tr>
                    <th></th>
                    <th>One-Time</th>
                    <th>Monthly</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.expensesTable}
            </tbody>
        </table>

               )
    }
}

export default Expenses;