import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './../App.css';

class AddTableItem extends Component {
    render() {
        // const{ 
        //     oneTimeRevenue, monthlyRevenue, totalRevenue, oneTimeExpense, monthlyExpense, totalExpense,
        //     monthlyContributionProfit, totalContributionProfit, contributionMargin, capitalROI
        // } = this.props;
        
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
                    defaultValue={this.props.newName ? this.props.newName : ''}
                />
                </Col>
                <Col sm={2} className="input-field">
                <Form.Control
                    type="number"
                    placeholder="One-Time Amount"
                    onChange = {this.props.handleOneTimeChange}
                    step="0.01"
                    min="0"
                    defaultValue={(this.props.newOneTime || this.props.newOneTime === 0) ? this.props.newOneTime : ''}
                />
                </Col>
                <Col sm={2} className="input-field">
                <Form.Control
                    type="number"
                    placeholder="Monthly Amount"
                    onChange = {this.props.handleMonthlyChange}
                    step="0.01"
                    min="0"
                    defaultValue={(this.props.newMonthly || this.props.newMonthly === 0) ? this.props.newMonthly : ''}
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

export default AddTableItem;