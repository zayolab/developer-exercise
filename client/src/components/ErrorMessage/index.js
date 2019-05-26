import React from "react"
import PropTypes from "prop-types"
import "./errormessage.css"

const ErrorMessage = ({ errorMsg }) => {
  return <h4 className="error text-center">{errorMsg}</h4>
}

ErrorMessage.propTypes = {
  errorMsg: PropTypes.string.isRequired
}

export default ErrorMessage
