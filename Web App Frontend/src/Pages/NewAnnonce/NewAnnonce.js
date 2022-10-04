/*Importing Components */
import {Container, Button, Row, Col, Form} from 'react-bootstrap';
import ReturnButton from '../../Components/ReturnButton/ReturnButton';

/*Importing Styles*/
import './NewAnnonce.css';

function NewAnnonce() {  
    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target);
    }

    return (
        <div className="NewAnnonces">
            <ReturnButton returnLink="/annonces"/>
                <div className="newAnnonces-container">
                    <Container>
                        <h2>Nouvelle Annonce</h2>
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <Row>    
                                        <Col xs={6} sm={4} md={3} lg={2} xl={2} xxl={2}>                     
                                            <label htmlFor="FormControlPets">Animaux</label>
                                            <input type="checkbox" className="form-control form-control-image" alt="test" id="FormControlImage"/>
                                        </Col>
                                        <Col xs={2} sm={3} md={2} lg={3} xl={2} xxl={2}>
                                            <label></label>
                                            <input type="button" className="form-control form-control-addbutton" value='+'></input>
                                        </Col>
                                        <Col>
                                        <Row>
                                            <Col className='radio-col'>
                                                <Row>
                                                    <Col>
                                                        <Form.Switch reverse style={{float:"left"}} id="custom-switch" className="custom-switch" label="Gardiennage" name="FormControlRadioGardiennage"></Form.Switch>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check type="switch" reverse style={{float:"left"}} id="custom-switch" className="custom-switch" label="Promenade" name="FormControlRadioPromenade"></Form.Check>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Form.Group>
                                            <Form.Label htmlFor="FormControlCalendrier">Calendrier</Form.Label>
                                            <Row>
                                                <Col md>
                                                    <Form.Control id="FormControlCalendrierDebut" type="date" placeholder="DateDebut"/>                                            
                                                </Col>
                                                {">"}
                                                <Col md>
                                                    <Form.Control id="FormControlCalendrierFin" type="date" placeholder="DateFin"/>    
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        </Row>
                                        </Col>
                                    </Row>

                                        <Form.Group>
                                            <Form.Label htmlFor="FormControlCommentaire"></Form.Label>
                                                <Form.Control
                                                as="textarea"
                                                placeholder="Commentaire"
                                                style={{ height: '100px' }}
                                                />
                                        </Form.Group>

                                        <Button className='submit-button' type="submit">Enregistrer</Button>
                                    
                                </div>
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>
    );
}


export default NewAnnonce;
