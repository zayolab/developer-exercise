// Kevin Valenzuela
import React from 'react'

function Error(props){
    return (
        <div>{
            props.error && 
            <h4 className="error text-center">{props.message}</h4>
            }
        </div>
    )
}
export default Error;