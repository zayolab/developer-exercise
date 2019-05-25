import React from "react"
import { Form } from "react-bootstrap"
import PropTypes from "prop-types"
import "./settimeperiod.css"

const SetTimePeriod = ({ timePeriod, handleTimePeriodChange }) => {
  return (
    <div className="set-time-period">
      <div className="time-period-select">
        <Form.Control
          as="select"
          onChange={handleTimePeriodChange}
          value={timePeriod}
        >
          <option value={3}>3 months</option>
          <option value={6}>6 months</option>
          <option value={12}>1 year</option>
          <option value={24}>2 years</option>
          <option value={60}>5 years</option>
          <option value={120}>10 years</option>
        </Form.Control>
      </div>
    </div>
  )
}

SetTimePeriod.propTypes = {
  timePeriod: PropTypes.number.isRequired,
  handleTimePeriodChange: PropTypes.func.isRequired
}

export default SetTimePeriod
