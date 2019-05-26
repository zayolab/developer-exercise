import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import PropTypes from "prop-types"
import "./settimeperiod.css"

class SetTimePeriod extends Component {
  static propTypes = {
    timePeriod: PropTypes.number.isRequired,
    handleTimePeriodChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      newTimePeriod: this.props.timePeriod
    }
    this.handleNewPeriodChange = this.handleNewPeriodChange.bind(this)
    this.updateTimePeriod = this.updateTimePeriod.bind(this)
  }

  handleNewPeriodChange(e) {
    this.setState({ newTimePeriod: Number(e.target.value) })
  }

  updateTimePeriod() {
    this.props.handleTimePeriodChange(this.state.newTimePeriod)
  }

  render() {
    return (
      <div className="set-time-period">
        <div className="time-period-select">
          <Form.Control
            as="select"
            onChange={this.handleNewPeriodChange}
            value={this.state.newTimePeriod}
          >
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>1 year</option>
            <option value={24}>2 years</option>
            <option value={60}>5 years</option>
            <option value={120}>10 years</option>
          </Form.Control>
          <Button onClick={this.updateTimePeriod}>Set Time Period</Button>
        </div>
      </div>
    )
  }
}

export default SetTimePeriod
