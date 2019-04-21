import React from 'react';
import {
  Row,
  Col,
  Form
 } from 'react-bootstrap';

export const ChooseTermLength = ({currentState, onTermChange}) => {
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
            onChange = {onTermChange}
            value={{currentState}.newTerm ? {currentState}.newTerm : '12'}
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
