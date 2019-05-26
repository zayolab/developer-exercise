import React, { Component } from "react"
import { Form } from "react-bootstrap"
import PropTypes from "prop-types"
import "./transactionfield.css"

class TransactionField extends Component {
  static propTypes = {
    format: PropTypes.oneOf(["string", "number"]).isRequired,
    id: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]).isRequired,
    handleUpdate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      newValue: this.props.value
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleNewFieldChange = this.handleNewFieldChange.bind(this)
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this)
  }

  toggleEdit() {
    this.setState(prevState => ({ edit: !prevState.edit }))
  }

  handleNewFieldChange(e) {
    const { value } = e.target
    this.setState({
      newValue: this.props.format === "number" ? Number(value) : value
    })
  }

  handleFieldUpdate() {
    const { id, type, field } = this.props
    this.props.handleUpdate(id, type, field, this.state.newValue)
    this.toggleEdit()
  }

  render() {
    const { edit, newValue } = this.state
    const { value, format } = this.props

    const InputElem =
      format === "string" ? (
        <Form.Control
          type="text"
          placeholder="Name"
          onChange={this.handleNewFieldChange}
          onBlur={this.handleFieldUpdate}
          value={newValue}
        />
      ) : (
        <Form.Control
          type="number"
          placeholder="One-Time Amount"
          onChange={this.handleNewFieldChange}
          onBlur={this.handleFieldUpdate}
          value={newValue}
        />
      )

    return edit ? (
      <div>{InputElem}</div>
    ) : (
      <span className="transaction-field" onClick={this.toggleEdit}>
        {format === "string" ? value : value.toFixed(2)}
      </span>
    )
  }
}

export default TransactionField
