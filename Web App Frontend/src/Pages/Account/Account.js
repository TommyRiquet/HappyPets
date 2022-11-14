/*Importing Components */
import { useEffect, useState } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Styles*/
import './Account.css';

/*Importing Images*/
import ProfilePicDefault from '../../Assets/profilePicture.png'
import ChatImage from'../../Assets/Chat.jpg';
import ChienImage from'../../Assets/Chien.jpg';
import HamsterImage from'../../Assets/Hamster.jpg';
import OiseauImage from'../../Assets/Oiseau.jpg';
import PoissonImage from'../../Assets/Poisson.jpg';
import TortueImage from'../../Assets/Tortue.jpg';

/*Importing Config*/
import config from "../../config.json";

function Account() {
    const AnimauxImages = {
        Chien: ChienImage,
        Chat: ChatImage,
        Poisson: PoissonImage,
        Rongeur: HamsterImage,
        Oiseau: OiseauImage,
        NAC: TortueImage,
      };

    const [InfoUser,setInfoUser] = useState({Pets: []})
    
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user')) || {Pets: []}
        setInfoUser(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <div className="Account">
                  <CustomNavbar
                        textLinkOne="Propositions"
                        linkOne="/propositions"
                        textLinkTwo="Annonces"
                        linkTwo="/annonces"
                        color="rgba(47, 72, 88, 1)"
                    />
                <Container className='top-container'>
                <h2>Ton profil</h2>
                </Container>

                <Container className='account-container'>
                    <Row >
                        <Col md={6} xs={12} className="left-content">

                            <img id="profilePic" src={InfoUser.PhotoLink===null?ProfilePicDefault:config.API_URL+"/images/"+InfoUser.PhotoLink} width="250px" height="250px" alt="Utilisateur"/>
                            
                            <br/>
                            <Button className='modify-button' variant="outline-secondary">Modifier vos informations</Button>
                        </Col>
                        <Col md={6} xs={12} className="right-content">
                            <table>
                                <tbody>
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
                                        <td>{InfoUser.City}</td>
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
                                </tbody>
                                </table>
                                {   InfoUser.Pets.length>0?
                                    <table>
                                        <tbody>
                                            <tr className='div-pic-animal'>
                                                    {InfoUser.Pets.map((pet,index)=>{
                                                        return <td className='pic-animal' key={"pets"+index}><img alt="my own Pet" src={AnimauxImages[pet.Type]}/><br/>
                                                        <p className='name-animal'>{pet.Name}</p></td>
                                                    })}
                                            </tr>
                                        </tbody>
                                    </table>
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
