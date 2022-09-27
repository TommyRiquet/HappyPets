/*Importing Components */
import { Card, Container, Row, Col, Button} from 'react-bootstrap';

/*Importing Styles*/
import './Annonces.css';


let ListAnnonces = [
    {name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin", photolink:""}
    ,{name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    ,{name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"}
    ,{name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"}
    ,{name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    ,{name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"}
    ,{name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"}
    ,{name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
    ,{name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"}
]

function Annonces() {
    return (
        <div className="Annonces">
                <Container className='top-container'>
                <h2>Animaux</h2>
                    <Button className='new-annonce-button' href=''>Nouvelle Annonce</Button>
                </Container>
                <Container className='annonces-container'>
                    <Row xs={1} sm={1} lg={2}>
                    {ListAnnonces.map((annonce) => {
                        return (
                            <Col>
                                <Card className='annonce-card'>
                                <Card.Body>
                                        
                                    <Row>
                                    <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                                        <img src='https://afcm.ca/wp-content/uploads/2018/06/no-photo.png' className="annonce-picture" alt="AnimalProfilePicture"></img>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col className="g-2"><div className='annonce-name'>{annonce.name +", "+ annonce.age}</div></Col>
                                            <Col><div className='annonce-date'>{annonce.date}</div></Col>
                                        </Row>
                                        <Row>
                                            <Col className="g-2"><div className='annonce-race'>{annonce.race}</div></Col>
                                            <Col><div className='annonce-master'>{annonce.master}</div></Col>
                                        </Row>
                                    </Col>
                                    </Row>
                                    
                                </Card.Body>
                                </Card>
                            </Col>
                            )
                        })
                    }
                    </Row>
                </Container>

        </div>
    );
}

export default Annonces;
