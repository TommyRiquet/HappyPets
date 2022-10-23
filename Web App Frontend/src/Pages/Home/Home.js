/*Importing Components */
import {Card,Row, Col, Container } from 'react-bootstrap';
/*Importing Styles*/
import './Home.css';
/*Importing Images*/
import imgChicken from '../../Assets/homeBackGround2.png';
import imgCat from '../../Assets/homeBackGround3.png';
import imgCounter from '../../Assets/counter-home.png'

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
                            <div id="counter-home">
                                    <img src={imgCounter}/><br/>
                                    <p id='number-counter-home'>115</p>
                                    <p id="text-counter-home">Animaux sauvés grâce à la plateforme</p>
                            </div>
                        </Col>
                        <Col>
                            <img id="imgChicken" src={imgChicken} alt="chicken"/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='homeContent3 scrollDiv'>
                <Container>
                    <Row xs={1} md={2}>
                        <Col style={{marginTop: '8%', maxWeight: '100%', maxHeight: '100%'}}>
                            <img id="imgCat" src={imgCat} alt="cat"/>
                        </Col>
                        <Col style={{marginTop: '8%', maxWeight: '100%', maxHeight: '100%'}}>
                            <p>Hospitalisation d’urgence, perte d’un logement...sont autant de difficultés qui ne laissent parfois 
                            d’autres choix que d’abandonner son animal. Durant les inondations de 2021, un énorme réseau d’entraide s’est
                            créé via les réseaux sociaux.<br/> Nous continuons l’effort ici.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;
