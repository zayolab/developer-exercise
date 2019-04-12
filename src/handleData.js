import React, { Component } from 'react';
import './App.css';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

class HandleNew extends Component{
  render(){
    return (
        <Form className="addExpenseOrRevenueForm" onSubmit={this.props.handleAdd}>
          <Row className="input-field">
            <Col sm={{ span: 2, offset: 1}} className="input-field">
              <Form.Control
                as="select"
                onChange = {this.props.handleTypeChange}
                value={this.props.newType ? this.props.newType : 'choose'}
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
                onChange = {this.props.handleNameChange}
                value={this.props.newName ? this.props.newName : ''}
                >
                </Form.Control>
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="One-Time Amount"
                onChange = {this.props.handleOneTimeChange}
                step="0.01"
                min="0"
                value={(this.props.newOneTime || this.props.newOneTime === 0) ? this.props.newOneTime : ''}>
                </Form.Control>
            </Col>
            <Col sm={2} className="input-field">
              <Form.Control
                type="number"
                placeholder="Monthly Amount"
                onChange = {this.props.handleMonthlyChange}
                step="0.01"
                min="0"
                value={(this.props.newMonthly || this.props.newMonthly === 0) ? this.props.newMonthly : ''}>
                </Form.Control>
            </Col>
            <Col sm={1} className="add-form-button">
              <Button type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      );
  }
};

class HandleTerm extends Component{
  render(){
    return(
      <Form className="changeTerm" onSubmit={this.props.setTerm}>
            <Row className="term-input">
              <Col sm={{ span: 3.5, offset: 1}} className="term-input">
                <Form.Control
                  onChange={this.props.handleTermChange}
                  as="select"
                  value={this.props.tempterm ? this.props.tempterm : 'choose'}
                  >
                  <option value='choose'>Select Term Length</option>
                  <option value='12'>12 Month Term</option>
                  <option value='24'>24 Month Term</option>
                  <option value='36'>36 Month Term</option>
                  <option value='48'>48 Month Term</option>
                  <option value='60'>60 Month Term</option>
                </Form.Control>
              </Col>
              <Col sm={1} className="term-input-button">
                <Button type="submit">
                  Change Term
                </Button>
              </Col>
              <Col sm={1}></Col>
              <Col sm={4.5} className="term-message">
              <h5>Totals are being claculated for a {this.props.term} month term</h5>
              </Col>
            </Row>
          </Form>
    );
  }
};
export{
  HandleNew,
  HandleTerm}