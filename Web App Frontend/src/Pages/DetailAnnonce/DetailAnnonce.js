import './DetailAnnonce.css';
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReturnButton from '../../Components/ReturnButton/ReturnButton';


function DetailAnnonce() {
    const [annonce,setAnnonce] = useState({
        "Pets": [
            {
                "Name": "Yoda",
                "Type": "Chat",
                "Race": "Exotic",
                "Age": "3",
                "Sexe": "F",
                "Weight": 3,
                "Height": "Normal",
                "User": {
                    "Firstname": "Marina",
                    "City": "Rixensart"
                },
                "PetsAnnonces": {
                    "createdAt": "2022-10-02T12:00:00.000Z",
                    "updatedAt": "2022-10-02T12:00:00.000Z",
                    "AnnonceId": 21,
                    "PetId": 3
                }
            },

        ]
    })
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
                console.log(data)
            });
    }

    return (
        <div className="DetailAnnonce">
            <CustomNavbar color="rgba(47, 72, 88, 1)"/>
            <ReturnButton/>
            <Container>
                <Row className="justify-content-md-center">
                    <Col></Col>
                    <Col>
                    
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>Propriétaire : { annonce.Pets[0].User.Firstname }</Col>                       
                </Row>
                <Row className="justify-content-md-center">
                    <Col>Description : {annonce.Comment}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailAnnonce;
