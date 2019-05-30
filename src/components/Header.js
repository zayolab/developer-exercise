import React from 'react'
import { Container } from 'reactstrap'

export default class NavBar extends React.Component {


render() {
    return (
      <Container>
        <nav className="navbar navbar-dark bg-secondary">
              <form className="form-inline my-2 my-lg-0">
                <div className="navbar-brand">ROI Calculator</div>
              </form>
      </Container>
   );
  }
}
