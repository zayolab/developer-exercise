import React, { Component } from 'react';
import {
  Row,
  Col,
  Form
 } from 'react-bootstrap';

export class ChooseTermLength extends Component {

  constructor(props) {
    super(props)

    this.state = {
	    newTerm: this.props.newTerm
    }

    this.handleTermChange = this.handleTermChange.bind(this)
  }

  handleTermChange(e) {
    this.props.onTermChange(e);

    this.setState({
      newTerm: e.target.value
     });
  }

  render () {
    return (
      <Form className="chooseTermLengthForm">
        <Row>
          <Col sm={{span: 2, offset:1}} className="input-field" />
          <Col sm={{span: 2}} className="input-field">
            <b>Term Length:</b>
          </Col>
          <Col sm={{span: 2, offset:1}} className="input-field">
            <Form.Control
              as="select"
              onChange = {this.handleTermChange}
              value={this.state.newTerm ? this.state.newTerm : '12'}
              >
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </Form.Control>  
          </Col>    
        </Row>
      </Form>
    );      
  }
}
