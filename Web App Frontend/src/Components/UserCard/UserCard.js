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
                                    <div className='proposition-lieu' data-testid='prposition-lieu'>{props.proposition.lieu}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3} md={2} lg={3} xl={3} xxl={2}>
                            <img src='https://s3-alpha-sig.figma.com/img/db45/db55/732d52613ca96423a9aeee6ad19a8c6e?Expires=1665360000&Signature=eFKl4kL91wGOvfie35TrBebuOF1CTlO2EWNCHfiIW1VowSqYs-WOap~z4ZJcGjOYAo8NNO7-Zg5RLy77uOK6pziyR8hBXhgWNQJkwotyEc4Stns2TX7ED~e9fBbg1d1rugjBTDp5WGLgHMCjGyUHg1dg5wDAcvFNi0er9uyIqp6ULROsMIlIM~Vzvd919iwp6Qe-kV-kRfWsw4DFueiPeqe~tkSyDrC5asbWzarlhxdBOnZJGehQLk6tzM1dp1Csc9XDzw2nRSOSaMHzl9vQP~VbAQaEqM6b~gCdJQMVHM2eUy2~kJyp-NDNYdeT7bC1fD-Vc~ankrqPqciCt9r7IA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA' className="note-picture" alt="UserNotePicture"></img>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard;