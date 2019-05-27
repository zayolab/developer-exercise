import React, { Component } from "react"
import { Row, Col, Button, Form } from "react-bootstrap"
import PropTypes from "prop-types"
import "./addtransaction.css"

class AddTransaction extends Component {
  static propTypes = {
    triggerError: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      newName: "",
      newMonthly: "",
      newOneTime: "",
      newType: ""
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOneTimeChange = this.handleOneTimeChange.bind(this)
    this.handleMonthlyChange = this.handleMonthlyChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
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

  handleAdd(e) {
    e.preventDefault()
    if (
      !this.state.newType ||
      !this.state.newName ||
      (!this.state.newOneTime && this.state.newOneTime !== 0) ||
      (!this.state.newMonthly && this.state.newMonthly !== 0)
    ) {
      this.props.triggerError(true, "Please fill out all fields")
    } else {
      const { newName, newMonthly, newOneTime, newType } = this.state
      this.props.handleAdd({ newName, newMonthly, newOneTime, newType })
      this.setState({
        newName: "",
        newMonthly: "",
        newOneTime: "",
        newType: ""
      })
    }
  }

  render() {
    const { newName, newType, newMonthly, newOneTime } = this.state

    return (
      <Form className="addExpenseOrRevenueForm" onSubmit={this.handleAdd}>
        <Row className="input-field">
          <Col sm={{ span: 2, offset: 1 }} className="input-field">
            <Form.Control
              as="select"
              onChange={this.handleTypeChange}
              value={newType ? newType : "choose"}
            >
              <option value="choose" disabled={true}>
                Select Type
              </option>
              <option value="revenue">Revenue</option>
              <option value="expenses">Expense</option>
            </Form.Control>
          </Col>
          <Col sm={3} className="input-field">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={this.handleNameChange}
              value={newName ? newName : ""}
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              type="number"
              placeholder="One-Time Amount"
              onChange={this.handleOneTimeChange}
              step="0.01"
              min="0"
              value={newOneTime || newOneTime === 0 ? newOneTime : ""}
            />
          </Col>
          <Col sm={2} className="input-field">
            <Form.Control
              type="number"
              placeholder="Monthly Amount"
              onChange={this.handleMonthlyChange}
              step="0.01"
              min="0"
              value={newMonthly || newMonthly === 0 ? newMonthly : ""}
            />
          </Col>
          <Col sm={1} className="add-form-button">
            <Button className="add-transaction-button" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default AddTransaction
