import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'
import './../App.css';

class AddTableItem extends Component {
    state = {
        newType: "",
        newName: "",
        newOneTime: "",
        newMonthly: "",
    }

    // set state of form variables 
    handleChange = (e) => this.setState({[e.target.name]: e.target.value});
    handleNumberChange = (e) => this.setState({[e.target.name]: Number(e.target.value)});

    // set state of form variables to app 

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.newType || !this.state.newName || (!this.state.newOneTime && this.state.newOneTime !== 0) || (!this.state.newMonthly && this.state.newMonthly !== 0)) {
            this.props.setError()
        } else {
            this.props.addItem(this.state.newType, this.state.newName, this.state.newMonthly, this.state.newOneTime)

            this.setState({
                newType: "",
                newName: "",
                newOneTime: "",
                newMonthly: ""
            })
        }
    }

    render() {
        // const{ 
        //     oneTimeRevenue, monthlyRevenue, totalRevenue, oneTimeExpense, monthlyExpense, totalExpense,
        //     monthlyContributionProfit, totalContributionProfit, contributionMargin, capitalROI
        // } = this.props;
        
        return (
            <Form className="addExpenseOrRevenueForm" onSubmit={this.onSubmit}>
            <Row className="input-field">
                <Col sm={{ span: 2, offset: 1}} className="input-field">
                <Form.Control
                    as="select"
                    name="newType"
                    onChange = {this.handleChange}
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
                    name="newName"
                    placeholder="Name"
                    onChange = {this.handleChange}
                    value={this.state.newName}
                />
                </Col>
                <Col sm={2} className="input-field">
                <Form.Control
                    type="number"
                    name="newOneTime"
                    placeholder="One-Time Amount"
                    onChange = {this.handleNumberChange}
                    step="0.01"
                    min="0"
                    value={(this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : ''}
                />
                </Col>
                <Col sm={2} className="input-field">
                <Form.Control
                    type="number"
                    name="newMonthly"
                    placeholder="Monthly Amount"
                    onChange = {this.handleNumberChange}
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

export default AddTableItem;