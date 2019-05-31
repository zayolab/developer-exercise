import React from 'react'
import { Container, Button } from 'reactstrap'
import '../App.css';

const Header = props => (
  <Container>
    <nav className="navbar navbar-dark bg-secondary">
      <form className="form-inline my-2 my-lg-0">
        <div className="navbar-brand">ROI Calculator</div>
      </form>
      <Button className="btn btn-success" onClick={props.deleteAllRevenueAndExpenses}>Clear All Data</Button>
    </nav>
  </Container>
)

export default Header
