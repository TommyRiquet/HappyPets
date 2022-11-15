/*Importing Components */
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Styles*/
import './Account.css';

/*Importing Images*/
import ProfilePicDefault from '../../Assets/profilePicture.png'
import ChatImage from '../../Assets/Chat.jpg';
import ChienImage from '../../Assets/Chien.jpg';
import HamsterImage from '../../Assets/Hamster.jpg';
import OiseauImage from '../../Assets/Oiseau.jpg';
import PoissonImage from '../../Assets/Poisson.jpg';
import TortueImage from '../../Assets/Tortue.jpg';

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

    const [InfoUser, setInfoUser] = useState({ Pets: [] })
    const [editionMode, setEditionMode] = useState(false);


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')) || { Pets: [] }
        setInfoUser(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function sendUpdateProfile() {
        /*
         *   Envoie les modifications du profil
         */
        fetch(config.API_URL + "/users/updateUser", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(InfoUser)
        })
    }


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

                        <img id="profilePic" src={InfoUser.PhotoLink === null ? ProfilePicDefault : config.API_URL + "/images/" + InfoUser.PhotoLink} width="250px" height="250px" alt="Utilisateur" />

                        <br />
                        {editionMode ? (

                                <Form.Group as={Row} className="mb-4 choose-image">
                                <Col sm="12">
                                    <Form.Label className="modify-label">Modifier la photo de profil</Form.Label>
                                    <Form.Control type="file" name="profilePicture" id="profilePicture" />
                                </Col>
                                </Form.Group>
                        ) : ("")}
                        <br />
                        <Button className='modify-button' onClick={
                            editionMode ? (e) => { sendUpdateProfile(); setEditionMode(false); }
                                : (e) => setEditionMode(true)
                        }>
                            {editionMode ? "Valider" : "Modifier les informations"}
                        </Button>
                    </Col>
                    <Col md={6} xs={12} className="right-content">
                        <table>
                            <tbody>
                                <tr className='td-title'>
                                    <td>Nom</td>
                                    <td>Prénom</td>
                                </tr>
                                <tr>
                                    <td>
                                        {editionMode ? (
                                            <Form.Control
                                                type="text"
                                                value={InfoUser.LastName}
                                                onChange={(e) =>
                                                    setInfoUser({
                                                        ...InfoUser,
                                                        LastName: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            InfoUser.LastName
                                        )}
                                    </td>
                                    <td>
                                        {editionMode ? (
                                            <Form.Control
                                                type="text"
                                                value={InfoUser.FirstName}
                                                onChange={(e) =>
                                                    setInfoUser({
                                                        ...InfoUser,
                                                        FirstName: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            InfoUser.FirstName
                                        )}
                                    </td>
                                </tr>
                                <tr className='td-title'>
                                    <td>Ville</td>
                                    <td>Code postal</td>
                                </tr>
                                <tr>
                                    <td>
                                        {editionMode ? (
                                            <Form.Control
                                                type="text"
                                                value={InfoUser.City}
                                                onChange={(e) =>
                                                    setInfoUser({
                                                        ...InfoUser,
                                                        City: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            InfoUser.City
                                        )}
                                    </td>
                                    <td>
                                        {editionMode ? (
                                            <Form.Control
                                                type="text"
                                                value={InfoUser.Postal}
                                                onChange={(e) =>
                                                    setInfoUser({
                                                        ...InfoUser,
                                                        Postal: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            InfoUser.Postal
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td-title'>Adresse mail</td>
                                </tr>
                                <tr>
                                    <td>
                                        {editionMode ? (
                                            <Form.Control
                                                type="text"
                                                value={InfoUser.Email}
                                                onChange={(e) =>
                                                    setInfoUser({
                                                        ...InfoUser,
                                                        Email: e.target.value
                                                    })
                                                }
                                            />
                                        ) : (
                                            InfoUser.Email
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td-title'>Animaux</td>
                                </tr>
                            </tbody>
                        </table>
                        {InfoUser.Pets.length > 0 ?
                            <table>
                                <tbody>
                                    <tr className='div-pic-animal'>
                                        {InfoUser.Pets.map((pet, index) => {
                                            return <td className='pic-animal' key={"pets" + index}><img alt="mon animal" src={AnimauxImages[pet.Type]} /><br />
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
