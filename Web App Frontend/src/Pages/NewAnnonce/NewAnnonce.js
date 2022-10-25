/*Importing Components */
import { useState } from 'react';
import {Container, Button, Row, Col, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router';

/*Importing Components*/
import ReturnButton from '../../Components/ReturnButton/ReturnButton';

/*Importing Styles*/
import './NewAnnonce.css';

function NewAnnonce() {  
    const [switchGardiennage,setSwitchGardiennage] = useState(false);
    const [switchPromenade,setSwitchPromenade] = useState(false);

    let navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:3001/annonces',{ 
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    Type: switchGardiennage ? "Gardiennage" : "Promenade",
                    Comment: event.target['Comment'].value, 
                    DateBegin: event.target['FormControlCalendarBegin'].value, 
                    DateEnd: event.target['FormControlCalendarEnd'].value, 
                    PetId: "1",
                })
            })
            .then(response => {
                if(response.ok){
                    navigate('/annonces')
                }else{
                    console.log("Erreur")
                }
            })
        
    }

    return (
        <div className="NewAnnonces">
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
                                                        <Form.Switch reverse style={{float:"left"}} id="switchGardiennage" className="custom-switch" 
                                                        label="Gardiennage" name="FormControlRadioGardiennage" 
                                                        checked={switchGardiennage}
                                                        onChange={e=>{
                                                            setSwitchPromenade(false)
                                                            setSwitchGardiennage(true)
                                                            }}></Form.Switch>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Switch reverse style={{float:"left"}} id="switchPromenade" className="custom-switch" 
                                                        label="Promenade" name="FormControlRadioPromenade" 
                                                        checked={switchPromenade}
                                                        onChange={e=>{
                                                            setSwitchPromenade(true)
                                                            setSwitchGardiennage(false)
                                                        }}></Form.Switch>

                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Form.Group>
                                            <Form.Label htmlFor="FormControlCalendar">Calendrier</Form.Label>
                                            <Row>
                                                <Col md>
                                                    <Form.Control required id="FormControlCalendarBegin" type="date" placeholder="DateDebut"/>                                            
                                                </Col>
                                                {">"}
                                                <Col md>
                                                    <Form.Control required id="FormControlCalendarEnd" type="date" placeholder="DateFin"/>    

                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{width:"100%"}}>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label htmlFor="FormControlComment"></Form.Label>
                                                    <Form.Control
                                                    as="textarea"
                                                    id="Comment"
                                                    placeholder="Commentaire"
                                                    style={{ height: '100px' }}
                                                    />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='p-3'>
                                            <Button className='submit-button' type="submit"  variant="">Enregistrer</Button>
                                        </Col>  
                                    </Row>
                                </div>
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>
    );
}


export default NewAnnonce;
