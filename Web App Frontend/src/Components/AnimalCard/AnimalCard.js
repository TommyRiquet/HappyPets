/*Importing Components */
import { Card, Row, Col, } from 'react-bootstrap';

/*Importing Styles*/
import './AnimalCard.css';

function AnimalCard(props) {
  const MaxNumberOfPetsPerAnnonce = 2;

  return (
    <div className="AnimalCard">
      <Card className='annonce-card'>
        <Card.Body>
            <Row>
              <Col>
                  {props.annonce.Pets.map((pet,index) => (
                    index>=MaxNumberOfPetsPerAnnonce?
                    null
                    :
                    <Row xs={3} md={2} lg={2} xl={2} xxl={2}>
                        <Col xs={4} sm={3} md={2} lg={3} xl={3} xxl={2}>
                          <img src={props.image[index]} className="annonce-picture" alt="AnimalProfilePicture"/>
                        </Col>
                        <Col>
                          <Row>
                            <Col className="g-1">
                              <div className='annonce-name'>
                                <span data-testid="annonce-name">
                                  {
                                    ( 
                                          pet.length===0 ? "Inconnu":
                                          pet.Name.length===0? "Inconnu" : pet.Name 
                                      )
                                    }
                                  </span>
                                  <span data-testid="annonce-age">
                                    {
                                      (
                                        pet.length===0 ? "":
                                        pet.Age>=0? ", "+pet.Age : ""
                                      )
                                    }
                                  </span>
                                </div>
                              </Col>
                          </Row>
                          <Row>
                              <Col className="g-2">
                                <div className='annonce-race' data-testid="annonce-race">
                                  {
                                  pet.length===0 ? "":
                                  pet.Race
                                  }
                                </div>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  ))}
              </Col>
              <Col  xs={1} md={1} lg={1} xl={1} xxl={1}>
                <Row className='annonce-date'>
                    <Col>
                      {
                          props.annonce.DateBegin.slice(5,10).replace("-","/")+ ">"+props.annonce.DateEnd.slice(5,10).replace("-","/")
                      }
                    </Col>
                </Row>
                <Row className='annonce-localite'>
                      <Col>
                        {
                          "Localité"
                        }
                      </Col>
                </Row>
                <Row className='annonce-user-firstname'>
                    <Col>
                      {
                        props.annonce.Pets.length===0 ? "Inconnu":
                        props.annonce.Pets[0].User.length===0 ? "Inconnu":
                        props.annonce.Pets[0].User.Firstname.length===0 ? "Inconnu" : props.annonce.Pets[0].User.Firstname
                      }
                    </Col>
                </Row>
              </Col>
            </Row>  
        </Card.Body>
      </Card>
    </div>
  );
}


export default AnimalCard;