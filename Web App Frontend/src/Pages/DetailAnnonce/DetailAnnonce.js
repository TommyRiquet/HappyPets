import './DetailAnnonce.css';
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReturnButton from '../../Components/ReturnButton/ReturnButton';

import DogIcon from "../../Assets/dog-icon.png";
import CatIcon from "../../Assets/cat-icon.png";
import BabyIcon from "../../Assets/baby-icon.png";

/*Importing Images*/
import ChienImage from "../../Assets/Chien.jpg";
import ChatImage from "../../Assets/Chat.jpg";
import PoissonImage from "../../Assets/Poisson.jpg";
import HamsterImage from "../../Assets/Hamster.jpg";
import PerroquetImage from "../../Assets/Perroquet.jpg";
import LapinImage from "../../Assets/Lapin.jpg";
import SerpentImage from "../../Assets/Serpent.jpg";
import TortueImage from "../../Assets/Tortue.jpg";

const AnimauxImages = {
  Chien: ChienImage,
  Chat: ChatImage,
  Poisson: PoissonImage,
  Rongeur: HamsterImage,
  Oiseau: PerroquetImage,
  Lapin: LapinImage,
  Serpent: SerpentImage,
  NAC: TortueImage,
};

function DetailAnnonce() {
    const [annonce,setAnnonce] = useState({
        "DateBegin": "",
        "DateEnd": "",
        "Pets": [
            {
                "Name": "",
                "Type": "",
                "Race": "",
                "Age": "",
                "Sexe": "",
                "Weight": 0,
                "Height": "",
                "User": {
                    "Firstname": "",
                    "City": ""
                },
                "PetsAnnonces": {
                    "createdAt": "",
                    "updatedAt": "",
                    "AnnonceId": 0,
                    "PetId": 0
                }
            },

        ]
    })
    const [displayPet,setDisplayPet] = useState({})

    let { id } = useParams();

    useEffect(()=>{
        getDetailAnnonce ();
    // eslint-disable-next-line
},[])

    function getDetailAnnonce () {

        fetch('http://localhost:3001/annonces/detailAnnonce?id='+id)
            .then((response) => response.json())
            .then((data) => {
                setAnnonce(data)
            });
    }

    useEffect(()=>{
        setDisplayPet(annonce.Pets[0])
    },[annonce])

    return (
        <div className="DetailAnnonce">
            <CustomNavbar color="rgba(47, 72, 88, 1)"/>
            <ReturnButton returnLink="/annonces"/>
            <Container>
            <Container fluid>
                <Row>
                    <Col>
                        <h3>
                            {
                                annonce.Pets.map((pet,index) => {
                                    return <span key={index}>{pet.Name+" "}</span>
                                    }
                                )
                            }
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span>à surveiller du {annonce.DateBegin.slice(5, 10)} au {annonce.DateEnd.slice(5, 10)}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Propriétaire : { annonce.Pets[0].User.Firstname }</h5>                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>Description : {annonce.Comment}</h5>
                    </Col>
                </Row>

                
                <Row>
                            {
                                annonce.Pets.map((pet,index) => {
                                    return index<=3 ? 
                                    (
                                        <Col xs={6} sm={3} key={index} onClick={e=>setDisplayPet(pet)} className="pet-image-container">
                                            <img className="pet-image" src={AnimauxImages[pet.Type]} alt=""></img>
                                        </Col>
                                    ) : <></>
                                }
                                )
                            }
                </Row>
                
                <Row>
                    <Col className="pet-name">
                        {
                            displayPet.Name +", "+ displayPet.Age
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {
                        displayPet.Race
                    }
                    </Col>
                </Row>
                <Row>
                    <Col sm={1}>
                        <img
                              src={DogIcon}
                              className={
                                displayPet.DogFriendly ? "green-icon" : "red-icon"
                              }
                              width="30"
                              height="30"
                              alt="Dog Icon"
                            ></img>
                    </Col>
                    <Col sm={1}>
                        <img
                              src={CatIcon}
                              className={
                                displayPet.CatFriendly ? "green-icon" : "red-icon"
                              }
                              width="30"
                              height="30"
                              alt="Cat Icon"
                            ></img>
                    </Col>
                    <Col sm={1}>
                        <img
                              src={BabyIcon}
                              className={
                                displayPet.BabyFriendly ? "green-icon" : "red-icon"
                              }
                              width="30"
                              height="30"
                              alt="Baby Icon"
                            ></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            displayPet.Comment
                        }
                    </Col>
                </Row>
            </Container>
            </Container>
        </div>
    );
}

export default DetailAnnonce;
