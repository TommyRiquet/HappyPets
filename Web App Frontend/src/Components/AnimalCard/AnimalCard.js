/*Importing Components */
import { Card, Row, Col, } from 'react-bootstrap';

/*Importing Styles*/
import './AnimalCard.css';

function AnimalCard(props) {
  return (
    <div className="AnimalCard">
      <Card className='annonce-card'>
        <Card.Body>
            <Row>
            <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                <img src='https://afcm.ca/wp-content/uploads/2018/06/no-photo.png' className="annonce-picture" alt="AnimalProfilePicture"></img>
            </Col>
            <Col>
                <Row>
                    <Col className="g-2"><div className='annonce-name'>{props.annonce.name +", "+ props.annonce.age}</div></Col>
                    <Col><div className='annonce-date'>{props.annonce.date}</div></Col>
                </Row>
                <Row>
                    <Col className="g-2"><div className='annonce-race'>{props.annonce.race}</div></Col>
                    <Col className='col-annonce-master'><div className='annonce-master'>{props.annonce.master}</div></Col>
                </Row>
            </Col>
            </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnimalCard;
