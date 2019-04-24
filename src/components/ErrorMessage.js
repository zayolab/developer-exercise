import React from 'react'

function ErrorMessage(props) {
  return (
    <div>
      { 
        props.error &&
        <h4 className="error text-center">{props.message}</h4>
      }
    </div>
  )
}

export default ErrorMessage