/*Importing Components */
import {Row, Col, Container, Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';
import Footer from '../../Components/Footer/Footer';
/*Importing Styles*/
import './Home.css';
/*Importing Images*/
import imgCat from '../../Assets/homeBackGround2.png';
import imgChicken from '../../Assets/homeBackGround3.png';
import imgCounter from '../../Assets/counter-home.png'

/*Importing Config*/
import config from "../../config.json";


function Home() {

    const [CounterAnnonces,setCounterAnnonces] = useState()
    useEffect(()=>{
        getCounterAnnonces()
    },[])

    
    function getCounterAnnonces(){
        /*
        Fonction qui permet de savoir combien d'annonces existent
        */
            fetch(config.API_URL+'/annonces/amount')
                .then((response) => response.json())
                .then((data) => {
                    setCounterAnnonces(data)
            });
    }

    return (
        <div>
            <div className='scrollDiv '>
                <CustomNavbar 
                    textLinkOne="Je propose mon aide"
                    linkOne="/propositions" 
                    textLinkTwo="J'ai besoin d'aide"
                    linkTwo="/annonces"
                    textLinkThree="S'inscrire"
                    linkThree="/register" 
                    textLinkFour="Se connecter"
                    linkFour="/login"
                    color="rgba(0, 0, 0, 0)"
                    position="absolute"
                />
                <div className='homeContent1'>
                <h1>Ensemble luttons contre les abandons</h1>
                </div>
            </div>
            <div className='homeContent2 scrollDiv'>
                <Container>
                    <Row>
                        <Col xs={12} md={6} style={{marginTop: '10%'}}>
                        <p>Près de <span style={{color:'orange'}}>30 000</span> animaux de compagnie sont abandonnés tous les ans.</p>
                        <p>Hospitalisation d’urgence, perte d’un logement, situations familiales problématiques...autant de difficultés qui ne laissent parfois 
                            d’autres choix que d’abandonner son animal. <br/> Durant les inondations de 2021, un énorme réseau d’entraide s’est
                            créé via les réseaux sociaux.<br/> Nous continuons l’effort ici.</p>
                        </Col>
                        <Col xs={12} md={6}>
                            <img id="imgCat" src={imgCat} alt="Chat"/>
                            <div id="counter-home">
                                    <img src={imgCounter} alt="Maison avec des animaux"/><br/>
                                    <p><span id='number-counter-home'>{CounterAnnonces}</span><br/>
                                    <span id="text-counter-home">Animaux aidés grâce à la plateforme</span></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='scrollDiv'>
                <div className='homeContent3'>
                    <Container style={{margin:'0', padding:"0"}}>
                        <Row xs={1} md={2}>
                            <Col className='chicken-col' style={{ maxWeight: '100%', maxHeight: '100%'}}>
                                <img id="imgChicken" src={imgChicken} alt="Poule"/>
                            </Col>
                            <Col id='all-buttons-home-page'>
                                <Button className='button-home-page' href="/propositions">Je propose mon aide</Button>
                                <br/>
                                <Button className='button-home-page' href="/annonces">J'ai besoin d'aide</Button>
                                {!localStorage.getItem('user') ? 
                                    <>
                                    <br/>
                                    <Button className='button-home-page' href="/register">S'inscrire</Button>
                                    <br/>
                                    <Button className='button-home-page' href="/login">Se connecter</Button>
                                    </>
                                    : null
                                }

                            </Col>
                        </Row>
                        <Footer/>
                    </Container>
                </div>
                
            </div>
        </div>
    );
}

export default Home;
