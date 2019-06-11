import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import '../../App.css';



class Input extends Component {
    
  render() { 
    console.log("propsz", this.props);
    return ( 
      <div>
        {/* Add new expense or revenue form */}
        <Form className="addExpenseOrRevenueForm" onSubmit={this.props.onAdd}>
          <Row className="input-field">
            <Col sm={{ span: 3}} className="input-field">
              <Form.Control
                as="select"
                onChange = {this.props.handleChange}
                value={this.props.formInfo.newType ? this.props.formInfo.newType : 'choose'}
                name="newType"
                >
                <option value="choose" disabled={true}>Select Type</option>
                <option value="revenue">Revenue</option>
                <option value="expenses">Expense</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="input-field">
            <Col sm={3} className="input-field">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange = {this.props.handleChange}
                value={this.props.formInfo.newName ? this.props.formInfo.newName : ''}
                name="newName"
              />
            </Col>
            <Col sm={3} className="input-field">
              <Form.Control
                type="number"
                placeholder="One-Time Amount"
                onChange = {this.props.handleChange}
                step="1"
                min="0"
                value={(this.props.formInfo.newOneTime || this.props.formInfo.newOneTime === 0) ? this.props.formInfo.newOneTime : ''}
                name="newOneTime"
              />
            </Col>
            <Col sm={3} className="input-field">
              <Form.Control
                type="number"
                placeholder="Monthly Amount"
                onChange = {this.props.handleChange}
                step="1"
                min="0"
                value={(this.props.formInfo.newMonthly || this.props.formInfo.newMonthly === 0) ? this.props.formInfo.newMonthly : ''}
                name="newMonthly"
              />
            </Col>
            <Col sm={2} className="add-form-button">
              <Button type="submit">
                Add
              </Button>
            </Col>
          </Row>

          
        
        {/* form errors */}
        { this.props.formError &&
          <h4 className="error text-center">Please fill out all fields</h4>
        }
        </Form>
      </div>
    );
  }
}
 
export default Input;