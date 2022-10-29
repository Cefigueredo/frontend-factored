import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandExample() {
  return (
    <>
      
      <Navbar bg="dark" variant="dark" fixed='top'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="../logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Factored
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandExample;