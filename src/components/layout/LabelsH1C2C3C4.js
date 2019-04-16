import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Static labels where:
//  H1="Revenue" or "Expenses"
//  C2="One-Time"
//  C3="Monthly"
//  C4="Total"
//
export class LabelsH1C2C3C4 extends Component {
  render() {
    return (
      <>
        <thead>
        <tr>
            <th>{this.props.H1}</th>
        </tr>
        <tr>
            <th></th>
            <th>{this.props.C2}</th>
            <th>{this.props.C3}</th>
            <th>{this.props.C4}</th>
        </tr>
        </thead>        
      </>
    )
  }
}

export default LabelsH1C2C3C4

LabelsH1C2C3C4.propTypes = {
  H1: PropTypes.string.isRequired,
  C2: PropTypes.string.isRequired,
  C3: PropTypes.string.isRequired,
  C4: PropTypes.string.isRequired
}
