import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
function Footer() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={{ fontSize: 10 }}>
            © Copyright Factored 2019 - 2022. All Rights Reserved.
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
