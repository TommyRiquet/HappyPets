/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, } from 'react-bootstrap';
import AnimalCard from '../../Components/AnimalCard/AnimalCard';
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';

/*Importing Styles*/
import './MesAnnonces.css';

/*Importing Images*/
import ChienImage from '../../Assets/Chien.jpg';
import ChatImage from '../../Assets/Chat.jpg';
import PoissonImage from '../../Assets/Poisson.jpg';
import HamsterImage from '../../Assets/Hamster.jpg';
import PerroquetImage from '../../Assets/Perroquet.jpg';
import LapinImage from '../../Assets/Lapin.jpg';
import SerpentImage from '../../Assets/Serpent.jpg';
import TortueImage from '../../Assets/Tortue.jpg';

/*Importing Config*/
import config from "../../config.json";

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

function Annonces(){
    const[ListAnnonces, setListAnnonces] = useState ([]);
    const[id, setID] = useState(0);
    let offset = 0

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        setID(JSON.parse(localStorage.getItem("user")).id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        LoadAnnonces(offset,id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    function LoadAnnonces(offset = 0,id = 0){

            fetch(config.API_URL+'/annonces/me?id='+id+'&offset='+offset)
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
        if(window.innerHeight+e.target.documentElement.scrollTop+1 >= e.target.documentElement.scrollHeight){
            offset += 6 
            LoadAnnonces(offset)
        }
    }
    return (
        <div className="mesannonces">
            <CustomNavbar textLinkOne="Propositions"
                          linkOne="/propositions"
                          textLinkTwo="Annonces"
                          linkTwo="/annonces"
                          color="rgba(47, 72, 88, 1)"
            />
            <Container className='top-container'>
                <h2>Mes Animaux</h2>
            </Container>

            <Container className='mesannonces-container'>
                 {
                 Object.keys(ListAnnonces).length === 0 ? 
                    <h2 className='no-result-message'>Aucun Résultat :/</h2> 
                    :
                     <Row xs={1} sm={1} lg={2} >
                        {
                            ListAnnonces.map((annonce,index) => {
                                return (
                                        <Col key={index} colSpan={annonce.Pets.length} onClick={()=>console.log(index)}>
                                            <AnimalCard annonce={annonce} image={
                                                    annonce.Pets.map((pet) => {                                                            
                                                        const ReturnTable = AnimauxImages[pet.Type]
                                                        return ReturnTable
                                                        })
                                                    } />
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