import './CustomNavbar.css';
import {Navbar, Container} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';  
import PerroquetImage from '../../Assets/Perroquet.jpg'; 
import { useEffect } from 'react';

function CustomNavbar(props) {
  useEffect(() => {
    document.getElementsByClassName("navbar")[0].style.backgroundColor = props.color;
  }, [props]);

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className='title-navbar'>
          <img
              src={PerroquetImage}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            QTPets 
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto"></Nav>
          <Nav className="d-flex">
          <Nav.Link href={props.linkOne}>{props.textLinkOne}</Nav.Link>
          <Nav.Link href={props.linkTwo}>{props.textLinkTwo}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;