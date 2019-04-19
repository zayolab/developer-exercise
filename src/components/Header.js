import React from 'react'
import {
  Navbar,
  Button
 } from 'react-bootstrap'
 import styles from '../App.css'


const Header = props => (
  <div className="navBar" >
        <img
          alt=""
          src='https://veeloinc.com/wp-content/uploads/2017/04/roi.png'
          width="100"
          height="90"
          className="d-inline-block align-center"
        />
        <h1 className="title">ROI Calculator</h1>
        <Button>Clear All</Button>
  </div>
)

export default Header
