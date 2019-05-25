import React from "react"
import "./loadingspinner.css"

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <svg
        width="200px"
        height="200px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-eclipse"
        style={{ background: "none" }}
      >
        <path
          ng-attr-d="{{config.pathCmd}}"
          ng-attr-fill="{{config.color}}"
          stroke="none"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#b5ccf1"
          transform="rotate(71.8387 50 51)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 51;360 50 51"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}

export default LoadingSpinner
