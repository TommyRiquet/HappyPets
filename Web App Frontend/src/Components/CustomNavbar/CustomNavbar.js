import './CustomNavbar.css';
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

/*Importing Images*/
import ProfilePicDefault from '../../Assets/profilePictureDefault.png'
import PerroquetImage from '../../Assets/bird.png';

/*Importing Config*/
import config from "../../config.json";



function CustomNavbar(props) {
  let navigate = useNavigate();

  useEffect(() => {
    document.getElementsByClassName("navbar")[0].style.backgroundColor = props.color;
    document.getElementsByClassName("navbar")[0].style.position = props.position;
  }, [props]);

  function clearLocalStorage(){
    localStorage.clear();
    navigate('/');
  }

  

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
          <Nav className="d-flex" style={{float: "right !important"}}>
            <Nav.Link className='link-white' href={props.linkOne} data-testid='link-one'>{props.textLinkOne}</Nav.Link>
            <Nav.Link className='link-white' href={props.linkTwo} data-testid='link-two'>{props.textLinkTwo}</Nav.Link>
            {!localStorage.getItem('user') ?
              <>
                <Nav.Link className='link-orange' href={props.linkThree} data-testid='link-three'>{props.textLinkThree}</Nav.Link>
                <Nav.Link className='link-orange' href={props.linkFour} data-testid='link-four'>{props.textLinkFour}</Nav.Link>
              </>
              :

              //si j'ai un user dans le local storage  
              <NavDropdown title={<button id='removeButton'>Mon compte  <img src={JSON.parse(localStorage.getItem('user')).PhotoLink === undefined || JSON.parse(localStorage.getItem('user')).PhotoLink === null ? ProfilePicDefault : config.API_URL + "/images/" + JSON.parse(localStorage.getItem('user')).PhotoLink } alt="Menu Profil" className='image-profil' id="navbarScrollingDropdown"/></button>} >
                <NavDropdown.Item href="/account">Mon profil</NavDropdown.Item>
                <NavDropdown.Item href="/mesannonces">
                  Mes annonces
                </NavDropdown.Item>
                <NavDropdown.Item href="/mespropositions">Mes propositions</NavDropdown.Item>
                {JSON.parse(localStorage.getItem('user')).Role === 1 ? <NavDropdown.Item href="/admin">Administration</NavDropdown.Item> : null }
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={()=>{clearLocalStorage()}}>
                  Déconnexion
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