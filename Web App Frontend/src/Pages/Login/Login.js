/*Importing Components */
import {Row, Col, Form, Button, Container } from 'react-bootstrap';
/*Importing Styles*/
import './Login.css';

function Login() {

    const sendForm = (event) =>{
        /*Cette fonction va envoyer les informations de l'utilisateur à la base de données et initier la session
        PRE : l'evenement recu par le formulaire
        POST : /
        */ 
       /*
        const user ={
            email: event.target[0].value,
            password: event.target[1].value
        };

        event.preventDefault()

        axios.post("/loginUser", user , { withCredentials: true })
        .then(res => {
            console.log(res)
            if(res.data !== "notok"){
                console.log(res)
                localStorage.clear();
                localStorage.setItem("id",res.data[0]._id);
                localStorage.setItem("lastname",res.data[0].lastname);
                localStorage.setItem("firstname",res.data[0].firstname);
                localStorage.setItem("email",res.data[0].email);
                localStorage.setItem("password",res.data[0].password);
                localStorage.setItem("newsletter",res.data[0].newsletter);
                console.log(res.data)
                if(res.data[0].lastname==="admin"){
                    localStorage.setItem("role","admin");
                }else{
                    localStorage.setItem("role","user");
                }
                navigate('/accueil');
                window.location.reload()
            }else{
                console.log('Mot de Passe incorrecte')
            }
        })
        .catch(err => console.log(err));
*/
        
  };

    return (
        <div className="Login">
                <Container className='title-container'>
                <h2>Connexion</h2>
                </Container>
                <Container className='main-container'>
                    <Form>
                        <Row className="justify-content-md-center mb-4">
                            <Col xs lg="6">
                                <Form.Label style={{float: "left"}} htmlFor="email">Adresse e-mail</Form.Label>
                                <Form.Control id="email"  placeholder="exemple@gmail.com" type='email' />
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center mb-4">
                            <Col xs lg="6">
                                <Form.Label style={{float: "left"}} htmlFor="password">Mot de passe</Form.Label>
                                <Form.Control id="password" placeholder="e5#3ft4%6" type='password' />
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Button style={{border:"1px black solid", padding:"0.5% 15%"}} variant="light" type='submit'>Se connecter</Button>
                            </Col>
                        </Row>
                    </Form>
                    <br />
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            {/* We have to create the route Registration to make it work*/}
                            <a href='/registration'> Vous n'avez pas encore de compte ? Cliquez ici pour vous en créer un !</a>
                        </Col>
                    </Row>      
                </Container>

        </div>
    );
}

export default Login;
