import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transaction from './Transaction';

export class RevenueTransactionList extends Component {
  render() {
    return this.props.RevenueTransactionList.map((item) => (
        <Transaction key={item.id} Transaction={item} revenue={true} handleDelete={this.props.handleDelete}  />
    ))
  }
}
export default RevenueTransactionList

RevenueTransactionList.propTypes = {
  RevenueTransactionList: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
}
