/*Importing Components */
import {Card, Row, Col} from 'react-bootstrap';

/*Importing Styles */
import './UserCard.css'; 

/*Importing Images*/
import ProfilePicDefault from '../../Assets/profilePictureDefault.png'

/*Importing Config*/
import config from "../../config.json";

function UserCard(props){
    return (
        <div className='UserCard'>
            <Card className='proposition'>
                <Card.Body>
                    <Row>
                        <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                            
                            <img src={props.proposition.User.PhotoLink === undefined || props.proposition.User.PhotoLink === null ? ProfilePicDefault : config.API_URL + "/images/" + props.proposition.User.PhotoLink} className="user-picture" alt="UserProfilePicture" />
                        </Col>
                        <Col>
                            <Row>                               
                                    <div className='proposition-name'>
                                        <span data-testid='proposition-name'>
                                            {(
                                                props.proposition.User.FirstName.length === 0 ? 
                                                "Inconnu" : props.proposition.User.FirstName 
                                            )}
                                        </span>
                                        </div>
                            </Row>
                            <Row>
                                <span className='proposition-description' data-testid='proposition-description'>
                                {(
                                    props.proposition.Type.length===0 ? "" : 
                                    props.proposition.Frequency.length===0 && props.proposition.Animal.length===0 ? props.proposition.Type :
                                    props.proposition.Frequency.length===0 ? props.proposition.Type + ' de ' + props.proposition.Animal : 
                                    props.proposition.Animal.length===0 ? props.proposition.Type + ' ' + props.proposition.Frequency :                               
                                    props.proposition.Type + ' ' + props.proposition.Frequency + ' de ' + props.proposition.Animal
                                )}
                                </span>
                            </Row>
                            <Row className='list-proposition'>
                                {(
                                    !("Pets" in props.proposition.User)? "" :
                                    props.proposition.User.Pets.length===0 ? "" :    
                                    <select >
                                        <option hidden>Animaux</option>
                                        {(
                                            props.proposition.User.Pets.map((pet,index)=>
                                            {
                                                return(
                                                <option className='list-proposition-animaux' data-testid='proposition-pets' disabled key={index}>
                                                    {(
                                                        !("Pets" in props.proposition.User)? "" : 
                                                        pet.length===0 ? "" :
                                                        pet.Name.length===0 ? pet.Type : 
                                                        pet.Type.length===0 ? pet.Name : 
                                                        pet.Name + " est un " + pet.Type
                                                    )}
                                                </option>
                                                )
                                            })                                 
                                        )}
                                    </select>                            
                                )}
                            </Row> 
                        </Col>
                            <Col>
                            <Row className='proposition-localite' data-testid={"proposition-user-city"}>
                                <Col>
                                    {
                                    !("User" in props.proposition)? "": 
                                    props.proposition.User.length===0 ? "":
                                    props.proposition.User.City.length===0 ? "" : props.proposition.User.City
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard;