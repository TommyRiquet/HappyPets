/*Importing Components */
import {Card, Row, Col, Button} from 'react-bootstrap';
import {useState, useEffect } from 'react';

/*Importing Styles */
import './NotificationCard.css'; 

/*Importing Config*/
import config from '../../config.json';

/*Importing Images*/
import profilePicture from '../../Assets/profilePictureDefault.png';
import binPicture from '../../Assets/bin.png';
import emailPicture from '../../Assets/email.png';


function NotificationCard(props){
    const [displayEmail, setDisplayEmail] = useState(false)

    useEffect(() => {
        setDisplayEmail(false)
    },[props.type])


    
    return (
        <div className='NotificationCard'>
            <Card className='notification'>
                <Card.Body>
                    <Row>
                        <Col xs='3'>
                            <Card.Img variant="top" 
                            src={props.notification.User.PhotoLink === null ?
                                    profilePicture :
                                    config.API_URL+"/images/"+props.notification.User.PhotoLink
                                } 
                            />
                        </Col>
                        <Col xs='2' className='center-row-notification'>
                            <h3>
                                {props.notification.User.FirstName}
                            </h3>
                        </Col>
                            {
                            displayEmail ?
                            <Col xs={{span: 3, offset:1}} lg={{span: 4, offset:1}} className='center-row-notification'>
                                {props.notification.User.Email}
                            </Col>
                            :
                            <Col xs={{span: 3, offset:3}} lg={{span: 2, offset:3}} className='center-row-notification'>
                                <Button variant='success' className='show-email-button' onClick={e=>setDisplayEmail(true)}>
                                    <img src={emailPicture} alt='Contacter' height="30"/>    
                                </Button>
                            </Col>
                            }
                        <Col xs='2' className='center-row-notification'>
                            <Button variant='danger' className='delete-email-button'
                            onClick={
                                
                                    e=>props.deleteSelf([
                                        (props.type === 'annonces' ?
                                        props.notification.AnnonceId
                                        :
                                        props.notification.PropositionId)
                                        ,props.notification.User.id
                                        ,props.index
                                    ])
                                
                                }>
                                <img src={binPicture} alt='Supprimer' height="30"/>    
                            </Button>    
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NotificationCard;