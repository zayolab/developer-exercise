import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {
    Button
   } from 'react-bootstrap'
  
class Transaction extends Component {
    render() {
        //console.log("props.element", this.props.element);
        let {id, name, oneTime, monthly } = this.props.element;
        let deletionHandler = this.props.revenue ? 'revenue' : 'expenses';
        return (
            <tr>
                  <td>{name}</td>
                  <td>${oneTime.toFixed(2)}</td>
                  <td>${monthly.toFixed(2)}</td>
                  <td><Button onClick={() => this.props.handleDelete(deletionHandler, id)}>Delete</Button></td>
            </tr>
        )
/* cruft
        return this.props.TransactionList.map((item) => (
            <Transaction key={item.id} element={item} />
        ))
 */
    }
}

/* What we expect to see up there:
            <tr key={"revenue"}>  // don't use index
          <td>{item.name}</td>
          <td>${item.oneTime.toFixed(2)}</td>
          <td>${item.monthly.toFixed(2)}</td>
          <td><Button onClick={() => this.handleDelete('revenue', index)}>Delete</Button></td>
*/
export default Transaction;

//Transaction.propTypes = {
//    Transaction: PropTypes.object.isRequired
//}
