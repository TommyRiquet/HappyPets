/*Importing Components */
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";


/*Importing Styles*/
import './Account.css';

/*Importing Images*/
import ProfilePicDefault from '../../Assets/profilePictureDefault.png'
import xIcon from "../../Assets/x-button.png";
import addButton from "../../Assets/add-button.png";

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";

/*Importing Config*/
import config from "../../config.json";




function Account() {
    const [InfoUser, setInfoUser] = useState({ Pets: [] })
    const [editionMode, setEditionMode] = useState(false);


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')) || {Pets: []}
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
        //Maintenant que InfoUser est à jour, on dit que le localStorage correspond à InfoUser
        localStorage.setItem("user", JSON.stringify(InfoUser))
    }

    function deleteAnimal(index) {
        /*
         *   Supprime un animal du profil
         */


        // eslint-disable-next-line no-restricted-globals
        let beSure = confirm("Voulez-vous vraiment supprimer cet animal ?");
        if (beSure) {
            fetch(config.API_URL + "/pets/hasAnnonce?id=" + index)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        alert("Vous ne pouvez pas supprimer un animal qui a des annonces");
                    }
                    else {
                        fetch(config.API_URL + "/pets/deleteAnimal?id=" + index);
                        alert("Animal bien supprimé.");
                        //pour enlever la photo de l'animal
                        document.getElementById("animal-" + index).innerHTML = "";
                        //pour enlever, dans l'objet InfoUser, l'animal
                        for (let i in InfoUser.Pets) {
                            if (InfoUser.Pets[i].id === index) {
                                InfoUser.Pets.splice(i, 1);
                            }
                        }
                        //Maintenant que l'animal est enlevé dans InfoUser, on dit que le localStorage correspond à InfoUser
                        localStorage.setItem("user", JSON.stringify(InfoUser))
                    }
                });
        }
    }

    function changeProfilPic(numberProfilPic) {
        //va changer la photo de profil dans la variable InfoUser

        if (typeof (numberProfilPic) != "number" || numberProfilPic > 6 || numberProfilPic < 0) {
            alert("Problème au changement de l'image");
            return -1;
        } else {
            setInfoUser({
                ...InfoUser,
                PhotoLink: "user-icon" + numberProfilPic + ".png"
            })
            document.getElementById("profile-pic").innerHTML = "<img id='profilePic' src='" + config.API_URL + "/images/user-icon" + numberProfilPic + ".png' width='250px' height='250px' alt='Utilisateur' />";
            return 0;
        }
    }

    function changeProfilColor(colorCode) {
        //va changer la couleur du background du profil pendant qu'on change la couleur voulue


        if (typeof (colorCode) === "string" && colorCode.length === 7 && colorCode[0] === "#") {
            let error = false;
            let regex = /^[a-z0-9]+$/i;
            //regarde pour voir si le code comporte bien que des chiffres et des lettres
            for (let i = 1; i < colorCode.length; i++) {
                if (!colorCode[i].match(regex)) {
                    error = true;
                }
            }
            //si il y a autre chose qu'un chiffre ou lettre dans le code
            if (error) {
                alert("Problème avec le changement de couleur.");
                return -1;
            } else {
                document.getElementById("profile-pic").style.backgroundColor = colorCode;
                return 0;
            }
        } else {
            //si problème avec le type, la longueur ou le début de la variable colorCode
            alert("Problème avec le changement de couleur.");
            return -1;
        }
    }

    function resetColor() {
        //va remettre la couleur à sa valeur d'origine
        if (InfoUser.ColorPhoto === undefined || InfoUser.ColorPhoto === null) {
            //si pas de code enregistre
            document.getElementById("profile-pic").style.backgroundColor = "";
        } else {
            document.getElementById("profile-pic").style.backgroundColor = InfoUser.ColorPhoto;
        }

    }

    function saveColor() {
        //va sauvegarder la couleur choisie et va la mettre dans la variable InfoUser
        setInfoUser({
            ...InfoUser,
            ColorPhoto: document.getElementById("choose-color").value
        })
    }

    function delColor() {
        //va supprimer la couleur d'arrière-plan et va changer la valeur de la variable InfoUser.ColorPhoto à null
        document.getElementById("profile-pic").style.backgroundColor = "";
        setInfoUser({
            ...InfoUser,
            ColorPhoto: null
        })
    }
    function navigateToCreateAnimal() {
        navigate('/createAnimal')
    }

    let navigate = useNavigate();
    return (
        <div className="Account">
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                color="rgba(47, 72, 88, 1)"
                position="absolute"
            />
            <Container className='top-container'>
                <h2>Ton profil</h2>
            </Container>

            <Container className='account-container'>
                <Row>
                    <Col md={6} xs={12} className="left-content">

                        <img id="profile-pic"
                             style={InfoUser.PhotoLink === undefined || InfoUser.PhotoLink === null ? {backgroundColor: ""} : {backgroundColor: InfoUser.ColorPhoto}}
                             src={InfoUser.PhotoLink === undefined || InfoUser.PhotoLink === null ? ProfilePicDefault : config.API_URL + "/images/" + InfoUser.PhotoLink}
                             width="250px" height="250px" alt="Utilisateur"/>

                        <br/>
                        {editionMode ? (
                            <div>
                                <p className="modify-label">Modifier la photo de profil</p>
                                <img src={config.API_URL + "/images/user-icon1.png"} alt="avatar 1"
                                     className='imgProfileChoose' onClick={() => changeProfilPic(1)}/>
                                <img src={config.API_URL + "/images/user-icon2.png"} alt="avatar 2"
                                     className='imgProfileChoose' onClick={() => changeProfilPic(2)}/>
                                <img src={config.API_URL + "/images/user-icon3.png"} alt="avatar 3"
                                     className='imgProfileChoose' onClick={() => changeProfilPic(3)}/>
                                <img src={config.API_URL + "/images/user-icon4.png"} alt="avatar 4"
                                     className='imgProfileChoose' onClick={() => changeProfilPic(4)}/>
                                <img src={config.API_URL + "/images/user-icon5.png"} alt="avatar 5"
                                     className='imgProfileChoose' onClick={() => changeProfilPic(5)}/>
                                <img src={config.API_URL + "/images/user-icon6.png"} alt="avatar 6"
                                     className='imgProfileChoose' onClick={() => changeProfilPic(6)}/>
                                <br/>
                                <label htmlFor="choose-color" id="label-choose-color">Choisissez une couleur: </label>
                                <br/>
                                <input onChange={(e) => changeProfilColor(e.target.value)} id="choose-color"
                                       type="color"/><p className='emoji-icon' onClick={() => saveColor()}>✔️</p><p
                                className='emoji-icon' onClick={() => delColor()}>❌</p>
                                <br/>
                                <Button className='blue-button' onClick={() => resetColor()}>Réinitialiser à la couleur
                                    sauvegardée</Button>
                                <br/>
                            </div>

                        ) : ("")}
                        <br/>
                        <Button className='orange-button' onClick={
                            editionMode ? (e) => {
                                    sendUpdateProfile();
                                    setEditionMode(false);
                                }
                                : (e) => setEditionMode(true)
                        }>
                            {editionMode ? "Valider tous les changements" : "Modifier les informations"}
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
                                        return <td className='pic-animal' id={"animal-" + pet.id} key={"pets" + index}>
                                            <img alt="mon animal" src={AnimauxImages[pet.Type]}/><br/>
                                            <p className='name-animal'>{pet.Name}</p>
                                            {editionMode ? (
                                                    <img
                                                        src={xIcon}
                                                        alt="supprimer l'animal"
                                                        onClick={(e) => deleteAnimal(pet.id)}
                                                        className="x-icon"
                                                    ></img>
                                                )
                                                :
                                                null
                                            }
                                        </td>

                                    })}
                                    <td className='pic-animal' id={"add"} key={"add"}>
                                        <img alt="ajouter animal" src={addButton} onClick={navigateToCreateAnimal}/>
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                            :
                            <div className="pic-animal"><img alt="ajouter animal" src={addButton} onClick={navigateToCreateAnimal}/></div>

                        }

                    </Col>
                </Row>
            </Container>

        </div>
    );
}


export default Account;
