import React, { Component, createRef } from "react"
import { Form } from "react-bootstrap"
import PropTypes from "prop-types"
import EditIcon from "../../assets/edit.png"
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
      editIcon: false,
      newValue: this.props.value
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleNewFieldChange = this.handleNewFieldChange.bind(this)
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this)
    this.toggleEditIcon = this.toggleEditIcon.bind(this)
  }

  toggleEdit() {
    this.setState(
      prevState => ({ edit: !prevState.edit }),
      () => {
        if (this.state.edit) {
          this.inputFieldRef.focus()
        }
      }
    )
    this.toggleEditIcon(null, false)
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

  toggleEditIcon(e, value) {
    this.setState(prevState => ({
      editIcon: typeof value !== "undefined" ? value : !prevState.editIcon
    }))
  }

  render() {
    const { edit, newValue, editIcon } = this.state
    const { value, format } = this.props

    const InputElem =
      format === "string" ? (
        <Form.Control
          type="text"
          onChange={this.handleNewFieldChange}
          onBlur={this.handleFieldUpdate}
          value={newValue}
          ref={input => (this.inputFieldRef = input)}
        />
      ) : (
        <Form.Control
          type="number"
          onChange={this.handleNewFieldChange}
          onBlur={this.handleFieldUpdate}
          value={newValue}
          ref={input => (this.inputFieldRef = input)}
        />
      )

    return edit ? (
      <div>{InputElem}</div>
    ) : (
      <span
        className="transaction-field"
        onClick={this.toggleEdit}
        onMouseOver={this.toggleEditIcon}
        onMouseOut={this.toggleEditIcon}
      >
        {format === "string" ? value : value.toFixed(2)}
        {editIcon && <img src={EditIcon} className="ml-1" />}
      </span>
    )
  }
}

export default TransactionField
