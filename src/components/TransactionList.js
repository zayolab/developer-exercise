import React, { Component } from 'react';
import Transaction from './Transaction';
//import PropTypes from 'prop-types';

class TransactionList extends Component {
    render() {
        //console.log("my TransactionList=", this.props.TransactionList);
        return this.props.TransactionList.map((item) => (
            <Transaction key={item.id} element={item} />
        ))
    }
}

export default TransactionList;

//TransactionList.propTypes = {
//    TransactionList: PropTypes.array.isRequired
//}
