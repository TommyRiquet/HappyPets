/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import AnimalCard from '../../Components/AnimalCard/AnimalCard';

/*Importing Styles*/
import './Annonces.css';

/*Importing Images*/
import ChienImage from '../../Assets/Chien.jpg';
import ChatImage from '../../Assets/Chat.jpg';
import PoissonImage from '../../Assets/Poisson.jpg';
import HamsterImage from '../../Assets/Hamster.jpg';
import PerroquetImage from '../../Assets/Perroquet.jpg';
import LapinImage from '../../Assets/Lapin.jpg';
import SerpentImage from '../../Assets/Serpent.jpg';
import TortueImage from '../../Assets/Tortue.jpg';

const AnimauxImages = {"Chien":ChienImage,
                        "Chat":ChatImage,
                        "Poisson":PoissonImage,
                        "Hamster":HamsterImage,
                        "Perroquet":PerroquetImage,
                        "Lapin":LapinImage,
                        "Serpent":SerpentImage,
                        "Tortue":TortueImage}

function MesAnnonces(){
    const[ListAnnonces, setMesAnnonces] = useState ([]);
    let offset = 0

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        LoadMesAnnonces();
    },[])

    function LoadMesAnnonces(offset = 0){
        fetch('http://localhost:3001/annonces?id=1')
            .then((response) => response.json())
            .the ((data) => {
                if(offset === 0){
                    setMesAnnonces(data)
                    return
                }
                setMesAnnonces(ListAnnonces => [...ListAnnonces, ...data])
            });
    }

    function handleScroll(e){
        if(window.innerHeight+e.target.documentElement.scrollTop+1 >= e.target.documentElement.scrollHeight){

            offset += 6 
            LoadProposition(offset)
        }
    }
    return (
        1
    )
}
export default MesAnnonces;