import React, {} from 'react';
import {
  Row,
  Col,
  Form
 } from 'react-bootstrap'
 import '../App.css';

class Term extends React.Component {
  constructor(props) {
    super();
  }

  // function for handleTerm
  func = (e) => {
    this.props.handleSelect(Number(e.target.value))
  }

  render() {
    return (
      <Form className="changeTerm">
        <Row className="input-field">
          <Col className="input-field">
            Change Total Term To
          </Col>
          <Col className="input-field">
            <Form.Control
              as="select"
              onChange={this.func}
              value={this.props.term}
              >
              <option value='12'>12 Month</option>
              <option value='24'>24 Month</option>
              <option value='36'>36 Month</option>
              <option value='48'>48 Month</option>
              <option value='60'>60 Month</option>
            </Form.Control>
          </Col>
        </Row>
      </Form>
    )
  }
}

export {Term};
