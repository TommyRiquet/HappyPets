/*Importing Components */
import {Row, Col, Form, Button, Container} from 'react-bootstrap';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
/*Importing Styles*/
import './Login.css';
import Axios from "axios";

function Login() {
    let navigate = useNavigate();

    function sendForm(event) {
        const user = {
            Email: event.target[0].value,
            Password: event.target[1].value
        };

        event.preventDefault()
        Axios.defaults.withCredentials = true
        axios.post("http://localhost:3001/users/login", user)
            .then((response) => {
                navigate("/")
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.error);
                } else if (error.request) {
                    console.log(error.request);
                    alert("Serveur injoignable")
                } else {
                    console.log('Error', error.message);
                }
            });
    }

    return (
        <div className="Login">
            <Container className='title-container'>
                <h2>Connexion</h2>
            </Container>
            <Container className='main-container'>
                <Form onSubmit={sendForm}>
                    <Row className="justify-content-md-center mb-4">
                        <Col xs lg="6">
                            <Form.Label style={{float: "left"}} htmlFor="email">Adresse e-mail</Form.Label>
                            <Form.Control id="email" placeholder="exemple@gmail.com" type='email' required/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-4">
                        <Col xs lg="6">
                            <Form.Label style={{float: "left"}} htmlFor="password">Mot de passe</Form.Label>
                            <Form.Control id="password" placeholder="e5#3ft4%6" type='password' required/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Button className='button' variant="light" type='submit'>Se connecter</Button>
                        </Col>
                    </Row>
                </Form>
                <br/>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        {/* We have to create the route Registration to make it work*/}
                        <p>Vous n'avez pas encore de compte ? <a href='/inscription' className='linkRegistration'>Cliquez
                            ici</a> pour vous en créer un !</p>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Login;
