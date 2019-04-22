import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap';
 import './App.css'

export class AddNewItemForm extends Component {

  constructor (props) {
    super(props);

    this.state = {
      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: ''
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this);
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }


  handleTypeChange(e) {
    this.props.onTypeChange(e);

    this.setState({
      newType: e.target.value
     });
  }

  handleNameChange(e) {
    this.props.onNameChange(e);

    this.setState({
      newName: e.target.value
    });
  }

  handleOneTimeChange(e) {
    this.props.onOneTimeChange(e);

    this.setState({
      newOneTime: e.target.value
    });
  }

  handleMonthlyChange(e) {
    this.props.onMonthlyChange(e);

    this.setState({
      newMonthly: e.target.value
    });
  }

  handleAdd(e) {
    this.props.onHandleAdd(e);

    this.setState({
      newType: '',
      newName: '',
      newOneTime: '',
      newMonthly: ''
    })
  }

  render () {
    return (
      <Form className="add-expense-or-revenue-form" onSubmit={this.handleAdd}>
        <Row className="input-field">
          <Col sm={{ span: 2, offset: 1}} className="input-field">
            <Form.Control
              as="select"
              onChange = {this.handleTypeChange}
              value={this.state.newType ? this.state.newType : 'choose'}
              >
              <option value="choose" disabled={true}>Select Type</option>
              <option value="revenue">Revenue</option>
              <option value="expenses">Expense</option>
            </Form.Control>
          </Col>
          <Col sm={3} className="input-field">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange = {this.handleNameChange}
              value={this.state.newName ? this.state.newName : ''}
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              type="number"
              placeholder="One-Time Amount"
              onChange = {this.handleOneTimeChange}
              step="0.01"
              min="0"
              value={(this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : ''}
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              type="number"
              placeholder="Monthly Amount"
              onChange = {this.handleMonthlyChange}
              step="0.01"
              min="0"
              value={(this.state.newMonthly || this.state.newMonthly === 0) ? this.state.newMonthly : ''}
            />
          </Col>
          <Col sm={1} className="add-form-button">
            <Button type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };
}