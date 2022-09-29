/*Importing Components */
import { Card, Row, Col, Container } from 'react-bootstrap';
/*Importing Styles*/
import './Home.css';
/*Importing Images*/
import imgChicken from '../../Assets/homeBackGround2.png';
import imgCat from '../../Assets/homeBackGround3.png';


function Home() {
    return (
        <div className="Home">
            <div className='homeContent1'>
                <p>Ensemble luttons contre les abandons</p>
            </div>
            <div className='homeContent2'>
                <Container>
                    <Row xs={1} md={2}>
                        <Col style={{marginTop: '10%'}}>
                            <p>Près de <span style={{color:'orange'}}>60 000</span> animaux domestiques sont abandonnés tous les ans par leurs maîtres à l'approche de l'été.</p>
                        </Col>
                        <Col>
                            <img id="imgChicken" src={imgChicken} alt="Image of a chicken"/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='homeContent3'>
                <Container>
                    <Row xs={1} md={2}>
                        <Col style={{marginTop: '8%', maxWeight: '100%', maxHeight: '100%'}}>
                            <img id="imgCat" src={imgCat} alt="Image of a chicken"/>
                        </Col>
                        <Col style={{marginTop: '8%', maxWeight: '100%', maxHeight: '100%'}}>
                            <p>Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;
