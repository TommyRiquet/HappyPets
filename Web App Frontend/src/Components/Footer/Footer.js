import './Footer.css';
import { Navbar, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

function Footer() {
    return (
      <Navbar expand="lg footer">
        <Container fluid>
          <Nav className="d-flex">
            <Nav.Link className='link-orange' href={'/mentionslegales'}>{'Mentions légales'}</Nav.Link>
            <Nav.Link className='link-orange' href={'mailto:happypets.support@hotmail.com'}>{'Contactez-Nous'}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default Footer;
