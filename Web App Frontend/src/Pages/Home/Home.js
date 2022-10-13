/*Importing Components */
import {Row, Col, Container } from 'react-bootstrap';
/*Importing Styles*/
import './Home.css';
/*Importing Images*/
import imgChicken from '../../Assets/homeBackGround2.png';
import imgCat from '../../Assets/homeBackGround3.png';

function Home() {
    return (
        <div className="Home">
            <div className='homeContent1 scrollDiv'>
                <h1>Ensemble luttons contre les abandons</h1>
            </div>
            <div className='homeContent2 scrollDiv'>
                <Container>
                    <Row xs={1} md={2}>
                        <Col style={{marginTop: '10%'}}>
                            <p>Près de <span style={{color:'orange'}}>65 000</span> animaux domestiques sont abandonnés tous les ans par leurs maîtres à l'approche de l'été.</p>
                        </Col>
                        <Col>
                            <img id="imgChicken" src={imgChicken} alt="Picture of a chicken"/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='homeContent3 scrollDiv'>
                <Container>
                    <Row xs={1} md={2}>
                        <Col style={{marginTop: '8%', maxWeight: '100%', maxHeight: '100%'}}>
                            <img id="imgCat" src={imgCat} alt="Picture of a cat"/>
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
