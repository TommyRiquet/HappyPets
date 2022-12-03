import './CustomNavbar.css';
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { useEffect } from 'react';

/*Importing Images*/
import ProfilePicDefault from '../../Assets/profilePictureDefault.png'
import PerroquetImage from '../../Assets/bird.png';

/*Importing Config*/
import config from "../../config.json";

function CustomNavbar(props) {
  useEffect(() => {
    document.getElementsByClassName("navbar")[0].style.backgroundColor = props.color;
    document.getElementsByClassName("navbar")[0].style.position = props.position;
  }, [props]);

  return (
    <Navbar expand="lg" data-testid="navbar">
      <Container fluid>
        <Navbar.Brand href="/" className='title-navbar'>
          <img
            src={PerroquetImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo de QTPets"
          />
          QTPets
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto"></Nav>
          <Nav className="d-flex">
            <Nav.Link href={props.linkOne} data-testid='link-one'>{props.textLinkOne}</Nav.Link>
            <Nav.Link href={props.linkTwo} data-testid='link-two'>{props.textLinkTwo}</Nav.Link>
            {!localStorage.getItem('user') ?
              <>
                <Nav.Link href={props.linkThree} data-testid='link-three'>{props.textLinkThree}</Nav.Link>
                <Nav.Link href={props.linkFour} data-testid='link-four'>{props.textLinkFour}</Nav.Link>
              </>
              :   

              //si j'ai un user dans le local storage  
              <NavDropdown src={JSON.parse(localStorage.getItem('user')).PhotoLink === undefined || JSON.parse(localStorage.getItem('user')).PhotoLink === null ? ProfilePicDefault : config.API_URL + "/images/" + JSON.parse(localStorage.getItem('user')).PhotoLink} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
              
              

            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;