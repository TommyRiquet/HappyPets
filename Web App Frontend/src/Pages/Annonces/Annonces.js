/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import AnimalCard from '../../Components/AnimalCard/AnimalCard';

/*Importing Styles*/
import './Annonces.css';


function Annonces() {
    const [ListAnnonces,setListAnnonces] = useState([])
    let offset = 0

    useEffect(()=>{
            window.addEventListener("scroll", handleScroll);
            LoadAnnonces();
        // eslint-disable-next-line
    },[])

  
    function LoadAnnonces(offset = 0){
    /*
    *   Fonction qui permet de charger les annonces
    */
        fetch('http://localhost:3001/annonces?offset='+offset)
            .then((response) => response.json())
            .then((data) => {
                if(offset === 0){
                    setListAnnonces(data)
                    return
                }
                setListAnnonces(ListAnnonces => [...ListAnnonces, ...data])
        });
    }


    function handleScroll(e){
    /* 
    *   Fonction qui permet de charger les annonces suivantes quand on arrive en bas de la page
    */
        if(window.innerHeight+e.target.documentElement.scrollTop >= e.target.documentElement.scrollHeight){
            offset += 6 
            LoadAnnonces(offset)
        }
    }

    return (
        <div className="Annonces">
                <Container className='top-container'>
                <h2>Animaux</h2>
                    <Button className='new-annonce-button' href=''>Nouvelle Annonce</Button>
                </Container>
                <Container className='annonces-container' >
                    {
                    Object.keys(ListAnnonces).length === 0 ? 
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
