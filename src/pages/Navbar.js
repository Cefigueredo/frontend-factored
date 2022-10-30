import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React, { Component } from "react";
export default class MyNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="../logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Factored
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    );
  }
}
