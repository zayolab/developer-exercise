import React from 'react'
import { Container, Form, Row, Col, Button } from 'reactstrap'

class InputForm extends React.Component {
  constructor() {
    super()

    this.state= {
      newName: '',
      newMonthly: '',
      newOneTime: '',
      newType: ''
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
  }

  handleTypeChange(e) {
    this.setState({
      newType: e.target.value
    })
  }

  handleNameChange(e) {
    this.setState({
      newName: e.target.value
    })
  }

  handleMonthlyChange(e) {
    this.setState({
      newMonthly: Number(e.target.value)
    })
  }

  handleOneTimeChange(e) {
    this.setState({
      newOneTime: Number(e.target.value)
    })
  }

render(){

return (

  <Container>
    <Form className="addExpenseOrRevenueForm" onSubmit={(e) => {this.props.handleAdd(e,this.state)}}>
      <Row className="input-field">
        <Col sm={{ span: 2, offset: 1}} className="input-field">
          <Form.Control
            as="select"
            onChange={this.props.handleTypeChange}
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
            onChange={this.props.handleNameChange}
            value={this.state.newName ? this.state.newName : ''}
          />
        </Col>
        <Col sm={2} className="input-field">
          <Form.Control
            type="number"
            placeholder="One-Time Amount"
            onChange={this.props.handleOneTimeChange}
            step="0.01"
            min="0"
            value={(this.state.newOneTime || this.state.newOneTime === 0) ? this.state.newOneTime : ''}
          />
        </Col>
        <Col sm={2} className="input-field">
          <Form.Control
            type="number"
            placeholder="Monthly Amount"
            onChange={this.props.handleMonthlyChange}
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

        <div>
        { this.state.error &&
        <h4 className="error text-center">Please fill out all fields</h4>
        }
        </div>
      </Form>
    </Container>
    )
  }
}
export default InputForm
