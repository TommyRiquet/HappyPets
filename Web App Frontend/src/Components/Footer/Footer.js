import './Footer.css';
import React, { useRef, useEffect } from 'react';
import { Navbar, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (window.innerHeight >=document.body.offsetHeight){
      footerRef.current.className = 'visible';
    }
    function handleScroll() {
      // Check si le rectangle est en vue
      const footerRect = footerRef.current.getBoundingClientRect();
      const isIntersecting = footerRect.top < window.innerHeight && footerRect.bottom >= 0;
   
      footerRef.current.className = isIntersecting ? 'visible' : 'invisible';
    }

    function handleResize() {
      const footerRect = footerRef.current.getBoundingClientRect();
      const isIntersecting = footerRect.top < window.innerHeight && footerRect.bottom >= 0;

      footerRef.current.className = isIntersecting ? 'visible' : 'invisible';
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={footerRef} className='invisible'>
      <Navbar expand="lg footer">
        <Container fluid>
          <Nav className="d-flex">
            <Nav.Link className='link-orange' href={'/mentionslegales'}>{'Mentions légales'}</Nav.Link>
            <Nav.Link className='link-orange' href={'mailto:happypets.support@hotmail.com'}>{'Contactez-Nous'}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Footer;





/*import { Navbar, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';*/
/*
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
}*/
