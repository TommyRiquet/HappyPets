/*Importing Components */
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

/*Importing Styles*/
import './AnimalCard.css';

/*Importing Icons*/
import FIcon from '../../Assets/F-Icon.png';
import MIcon from '../../Assets/M-Icon.png';
import DogIcon from '../../Assets/dog-icon.png';
import CatIcon from '../../Assets/cat-icon.png';
import BabyIcon from '../../Assets/baby-icon.png';

function AnimalCard(props) {
  const MaxNumberOfPetsPerAnnonce = 3;

  return (
    <div className="AnimalCard">
      <Card className='annonce-card'>
        <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <span className='type-annonce' data-testid={'annonce-type'}>
                      {props.annonce.Type}
                    </span>
                  </Col>
                </Row>
                  {props.annonce.Pets.map((pet,index) => (
                    index>=MaxNumberOfPetsPerAnnonce?
                    null
                    :
                    <Row xs={3} md={2} lg={2} xl={2} xxl={2} key={index}>
                        <Col xs={4} sm={3} md={2} lg={3} xl={3} xxl={2} key={index}>
                          <Row>
                            <Col>
                              <img src={props.image[index]} className="annonce-picture" alt="AnimalProfilePicture"/>
                            </Col>
                          </Row>
                          <Row>
                            <Col className={'annonce-pets-information'}>
                                { 
                                  props.annonce.Pets[index].Sexe === "F" ?<img data-testid={"annonce-pets-sexe"+index} src={FIcon} alt='F-icon' width={20}></img>:
                                  props.annonce.Pets[index].Sexe === "M" ? <img data-testid={"annonce-pets-sexe"+index} src={MIcon} alt='M-icon' width={20}></img> :null
                                }
                              <span data-testid={"annonce-pets-height"+index}>
                                {
                                  " "+props.annonce.Pets[index].Height
                                }
                              </span>
                              <span data-testid={"annonce-pets-weight"+index}>
                                {
                                  props.annonce.Pets[index].Weight === null ? " " : ", "+props.annonce.Pets[index].Weight+"kg"
                                }
                              </span>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col>
                              <div className='annonce-name'>
                                <span data-testid={"annonce-pets-name"+index}>
                                  {
                                    ( 
                                          pet.length===0 ? "Inconnu":
                                          pet.Name.length===0? "Inconnu" : pet.Name 
                                      )
                                    }
                                  </span>
                                  <span data-testid={"annonce-pets-age"+index}>
                                    {
                                      (
                                        pet.length===0 ? "":
                                        pet.Age>=0?
                                        (", "+pet.Age+" an"+(pet.Age>1?"s":'')) 
                                        : null
                                      )
                                    }
                                  </span>
                                </div>
                              </Col>
                          </Row>
                          <Row>
                            <Col className='annonce-sterile-checkbox'>
                              <input type='checkbox' checked={pet.Sterile} disabled data-testid={"annonce-sterile-checkbox"+index}/>
                              <label labelfor='sterile-checkbox'>Stérilisation</label>                           
                            </Col>
                          </Row>
                          <Row>
                              <Col className='annonce-info-checkbox'>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>
                                                                            {!pet.DogFriendly?"Ne supporte pas":"Supporte"} la présence de chiens
                                                                          </Tooltip>}>
                                      <img src={DogIcon} className={pet.DogFriendly?"green-icon":"red-icon"} width="30" height="30" alt='Dog Icon'></img>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>
                                                                            {!pet.CatFriendly?"Ne supporte pas":"Supporte"} la présence de chats
                                                                          </Tooltip>}>
                                      <img src={CatIcon} className={pet.CatFriendly?"green-icon":"red-icon"} width="30" height="30" alt='Cat Icon'></img>
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>                                                                            
                                                                            {!pet.KidFriendly?"Ne supporte pas":"Supporte"} la présence d'enfants
                                                                          </Tooltip>}>
                                      <img src={BabyIcon} className={pet.KidFriendly?"green-icon":"red-icon"} width="30" height="30" alt='Baby Icon'></img>
                                  </OverlayTrigger>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
                  ))}
              </Col>
              <Col  xs={1} md={1} lg={1} xl={1} xxl={1}>
                <Row className='annonce-date' data-testid={"annonce-date"}>
                    <Col>
                      {
                          props.annonce.DateBegin.slice(5,10).replace("-","/")+ ">"+props.annonce.DateEnd.slice(5,10).replace("-","/")
                      }
                    </Col>
                </Row>
                <Row className='annonce-localite' data-testid={"annonce-user-city"}>
                      <Col>
                        {
                          !("User" in props.annonce.Pets[0])? "": 
                          props.annonce.Pets[0].User.length===0 ? "":
                          props.annonce.Pets[0].User.City.length===0 ? "" : props.annonce.Pets[0].User.City
                        }
                      </Col>
                </Row>
                <Row className='annonce-user-firstname' data-testid={"annonce-user-firstname"}>
                    <Col>
                      {
                         !("User" in props.annonce.Pets[0])? "": 
                         props.annonce.Pets[0].User.length===0 ? "":
                         props.annonce.Pets[0].User.Firstname.length===0 ? "" : props.annonce.Pets[0].User.Firstname
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