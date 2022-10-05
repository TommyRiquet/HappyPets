/*Importing Components */
import {Card, Row, Col} from 'react-bootstrap';

/*Importing Styles */
import './UserCard.css'; 

function UserCard(props){
    return (
        <div className='UserCard'>
            <Card className='proposition'>
                <Card.Body>
                    <Row>
                        <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                            <img src='https://afcm.ca/wp-content/uploads/2018/06/no-photo.png' className="user-picture" alt="UserProfilePicture"></img>
                        </Col>
                        <Col>
                            <Row>
                                <Col className='g-2'>
                                    <div className='proposition-name'>
                                        <span data-testid='proposition-name'>{(props.proposition.name.length===0? "Inconnu" :props.proposition.name )}</span>
                                        <span data-testid='proposition-age'>{(props.proposition.age>=0? ","+props.proposition.age : "")}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='g-2'>
                                    <div className='proposition-lieu' data-testid='prposition-lieu'>{props.proposition.lieu}
                                        <span data-testid='proposition-lieu'>{(props.proposition.lieu.length===0? "Inconnu" :props.proposition.lieu )}</span>
                                    </div>
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