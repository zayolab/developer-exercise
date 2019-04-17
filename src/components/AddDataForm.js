import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form
 } from 'react-bootstrap'

export const AddDataForm = props => {
  return (
    <Form className="addExpenseOrRevenueForm" >
      <Row className="input-field">
        <Col sm={{ span: 2, offset: 1}} className="input-field">
          <Form.Control
            as="select"
            onChange = ''
            value= ''
            >
            <option value="choose">Select Type</option>
            <option value="revenue">Revenue</option>
            <option value="expenses">Expense</option>
          </Form.Control>
        </Col>
        <Col sm={3} className="input-field">
          <Form.Control
            type="text"
            placeholder="Name"
            onChange = ''
            value=''
          />
        </Col>
        <Col sm={2} className="input-field">
          <Form.Control
            type="number"
            placeholder="One-Time Amount"
            onChange = ''
            step="0.01"
            min="0"
            value=''
          />
        </Col>
        <Col sm={2} className="input-field">
          <Form.Control
            type="number"
            placeholder="Monthly Amount"
            onChange = ''
            step="0.01"
            min="0"
            value=''
          />
        </Col>
        <Col sm={1} className="add-form-button">
          <Button type="submit">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddDataForm
