/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';

/*Importing Styles*/
import './Account.css';

/*Importing Images*/
import profilePicture from '../../Assets/profilePicture.png';
import ChatPic from'../../Assets/Chat.jpg';
import ChienPic from'../../Assets/Chien.jpg';
import HamsterPic from'../../Assets/Hamster.jpg';
import LapinPic from'../../Assets/Lapin.jpg';
import OiseauPic from'../../Assets/Oiseau.jpg';
import PerroquetPic from'../../Assets/Perroquet.jpg';
import PoissonPic from'../../Assets/Poisson.jpg';
import SerpentPic from'../../Assets/Serpent.jpg';
import TortuePic from'../../Assets/Tortue.jpg';

function Account() {
    const AnimauxPic = {
        Chat: ChatPic,
        Chien: ChienPic,
        Hamster: HamsterPic,
        Lapin: LapinPic,
        Oiseau: OiseauPic,
        Perroquet: PerroquetPic,
        Poisson: PoissonPic,
        Serpent: SerpentPic,
        Tortue: TortuePic
    }

    const [InfoUser,setInfoUser] = useState({"Pets":[]})
    useEffect(()=>{
        getInfoUser(3)
    },[])

    
    function getInfoUser(idUser){
        /*
        Fonction qui permet de charger les infos de l'utilisateur
        */
            fetch('http://localhost:3001/users?id='+idUser)
                .then((response) => response.json())
                .then((data) => {
                    setInfoUser(data[0])
                    console.log(data[0]);
            });
    }


    return (
        <div className="Account">
                <Container className='top-container'>
                <h2>Ton profil</h2>
                </Container>

                <Container className='account-container'>
                    <Row >
                        <Col md={6} xs={12} className="left-content">
                            <img id="profilePic" src={profilePicture} alt="Profile picture"/>
                            <br/>
                            <Button className='modify-button' variant="outline-secondary">Modifier vos informations</Button>
                        </Col>
                        <Col md={6} xs={12} className="right-content">
                            <table>
                                <tr className='td-title'>
                                    <td>Nom</td>
                                    <td>Prénom</td>
                                </tr>
                                <tr>
                                    <td>{InfoUser.LastName}</td>
                                    <td>{InfoUser.FirstName}</td>
                                </tr>
                                <tr className='td-title'>
                                    <td>Ville</td>
                                    <td>Code postal</td>
                                </tr>
                                <tr>
                                    <td>{InfoUser.Ville}</td>
                                    <td>{InfoUser.Postal}</td>
                                </tr>
                                <tr>
                                    <td className='td-title'>Adresse mail</td>
                                </tr>
                                <tr>
                                    <td>{InfoUser.Email}</td>
                                </tr>
                                <tr>
                                    <td className='td-title'>Animaux</td>
                                </tr>
                                </table>
                                {InfoUser.Pets != 0 ?
                                    <div className='div-pic-animal'>
                                        {InfoUser.Pets.map((pet)=>{
                                            return <td className='pic-animal'><img src={AnimauxPic[pet.Type]}/><br/><p className='name-animal'>{pet.Name}</p></td>
                                        })}
                                    </div>
                                    :
                                    <p>Vous n'avez pas d'animaux :/</p>
                            }
                        </Col>
                    </Row>
                </Container>

        </div>
    );
}


export default Account;
