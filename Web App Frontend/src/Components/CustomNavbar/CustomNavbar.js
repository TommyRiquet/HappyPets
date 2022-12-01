import './CustomNavbar.css';
import { Navbar, Container } from "react-bootstrap";
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
              <img className='image-profil' src={config.API_URL + "/images/" + props.PhotoLink} alt="Accès au profil" />

            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;