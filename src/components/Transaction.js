import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button
   } from 'react-bootstrap'
  
class Transaction extends Component {
    render() {
        //console.log("props.Transaction", this.props.Transaction);
        let {id, name, oneTime, monthly } = this.props.Transaction;
        let deletionHandler = this.props.revenue ? 'revenue' : 'expenses';
        return (
            <tr>
                  <td>{name}</td>
                  <td>${oneTime.toFixed(2)}</td>
                  <td>${monthly.toFixed(2)}</td>
                  <td><Button onClick={() => this.props.handleDelete(deletionHandler, id)}>Delete</Button></td>
            </tr>
        )
    }
}

export default Transaction;

Transaction.propTypes = {
    Transaction: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    revenue: PropTypes.bool.isRequired
}
