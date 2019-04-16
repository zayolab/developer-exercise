import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Transaction from './Transaction';

export class ExpenseTransactionList extends Component {
  render() {
    return this.props.ExpenseTransactionList.map((item) => (
        <Transaction key={item.id} Transaction={item} revenue={false} handleDelete={this.props.handleDelete}  />
    ))
  }
}
export default ExpenseTransactionList

ExpenseTransactionList.propTypes = {
    ExpenseTransactionList: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired
  }
  