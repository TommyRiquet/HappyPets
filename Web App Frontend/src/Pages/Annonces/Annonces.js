/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import AnimalCard from '../../Components/AnimalCard/AnimalCard';

/*Importing Styles*/
import './Annonces.css';


function Annonces() {
    const [ListAnnonces,setListAnnonces] = useState([])


    useEffect(()=>{
        fetch('http://localhost:3001/annonces')
            .then((response) => response.json())
            .then((data) => setListAnnonces(data));
    },[])



    useEffect(()=>{
        console.log(ListAnnonces)
    },[ListAnnonces])


    return (
        <div className="Annonces">
                <Container className='top-container'>
                <h2>Animaux</h2>
                    <Button className='new-annonce-button' href=''>Nouvelle Annonce</Button>
                </Container>
                <Container className='annonces-container'>

                    {
                    ListAnnonces.length === 0 ? 
                        <h2 className='no-result-message'>Aucun Résultat :/</h2> 
                        :
                        <Row xs={1} sm={1} lg={2}>
                            {
                                ListAnnonces.map((annonce,index) => {
                                    return (
                                        <Col key={index} onClick={e=>console.log(index)}>
                                            <AnimalCard annonce={annonce} />
                                        </Col>
                                        )
                                })
                            }
                        </Row>
                        }
                    
                </Container>

        </div>
    );
}

export default Annonces;
