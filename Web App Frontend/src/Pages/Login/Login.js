/*Importing Components */
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { sha256 } from 'js-sha256';
import { useNavigate } from 'react-router';
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer'

/*Importing Styles*/
import './Login.css';

/*Importing Config*/
import config from "../../config.json";


function Login() {
    const [captchaResult, setCaptchaResult] = useState()
    let navigate = useNavigate();
    const recaptchaRef = React.createRef();

    function onChange(value) {
        fetch(config.API_URL + "/users/capcha", {
            method: 'POST',
            body: JSON.stringify({ 'captcha_value': value }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(data => {
                if (data){
                    setCaptchaResult(true)
                }
                
            })
    }


    function sendLogin(event) {
        recaptchaRef.current.reset();
        event.preventDefault()
        if (captchaResult){
            const user = {
                Email: event.target[0].value,
                Password: sha256(event.target[1].value + "J'aime bien Tommy")
            };
    
    
            fetch(config.API_URL + "/users/login", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: (
                    JSON.stringify(user)
                )
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        document.getElementById("error-message").innerText = data.error
                    } else {
                        localStorage.setItem("accessToken", data.token)
                        localStorage.setItem("user", JSON.stringify(data.user))
                        navigate('/')
                    }
                }
                )
        }
    }

    return (
        <div className="Login">
            <CustomNavbar color="rgba(47, 72, 88, 1)" position="absolute" />
            <Container className='title-container'>
                <h2>Connexion</h2>
            </Container>
            <Container className='main-container'>
                <Form onSubmit={sendLogin}>
                    <Row className="justify-content-md-center mb-4">
                        <Col>
                            <Form.Label className='custom-form-label' htmlFor="email">Adresse e-mail</Form.Label>
                            <Form.Control id="email" className='form-login' placeholder="exemple@gmail.com" type='email'
                                required />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col>
                            <Form.Label className='custom-form-label' htmlFor="password">Mot de passe</Form.Label>
                            <Form.Control id="password" className='form-login' placeholder="e5#3ft4%6" type='password'
                                required />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col>
                            <ReCAPTCHA sitekey={"6LcJY20jAAAAAKaQm8F7OUTWEewO6kuQDWRmaINV"} ref={recaptchaRef}
                                onChange={onChange} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Button className='button' variant="light" type='submit'>Se connecter</Button>
                        </Col>
                        < Form.Text id="error-message" muted />

                    </Row>
                </Form>
                <br />
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <p>Vous n'avez pas encore de compte ? <a href='/register' className='linkRegistration'>Cliquez
                            ici</a> pour vous en créer un !</p>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default Login;
