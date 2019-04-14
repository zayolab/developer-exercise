import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class Transaction extends Component {
    render() {
        //console.log("my TransactionList=", this.props.TransactionList);
        return (
            <div>
                <p>{this.props.transaction.title}</p>
            </div>
        )
/* cruft
        return this.props.TransactionList.map((item) => (
            <Transaction key={item.id} element={item} />
        ))
 */
    }
}

export default Transaction;

//Transaction.propTypes = {
//    Transaction: PropTypes.object.isRequired
//}
