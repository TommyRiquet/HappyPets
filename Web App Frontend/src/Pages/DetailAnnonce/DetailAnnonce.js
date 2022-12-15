/*Importing Components*/
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';


import Footer from '../../Components/Footer/Footer';
import ReturnButton from "../../Components/ReturnButton/ReturnButton";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import AddPetModal from "../../Components/AddPetModal/AddPetModal";
import AddSignalement from "../../Components/AddSignalement/AddSignalement";

/*Importing Icons*/
import DogIcon from "../../Assets/dog-icon.png";
import CatIcon from "../../Assets/cat-icon.png";
import BabyIcon from "../../Assets/baby-icon.png";
import addButton from "../../Assets/add-button.png";
import xIcon from "../../Assets/x-button.png";
/*Importing Styles*/
import "./DetailAnnonce.css";

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";

/*Importing Config*/
import config from "../../config.json";




function DetailAnnonce() {
  /*
    Cette page affiche les détails d'une annonce
    Elle est accessible depuis la page d'accueil
    Elle est accessible depuis la page de ses propres annonces
  */

  /*
   *   id : Récupération de l'id de l'annonce depuis l'url
   *   displayPet : Animal affiché
   *   isModifiable : Si l'annonce est modifiable ou non (si le user possède l'annonce)
   *   editionMode : Si l'annonce est en mode édition ou non
   *   showAddPetModal : Si le modal d'ajout d'animal est affiché ou non
   *   annonce : Annonce affichée
   */
  let navigate = useNavigate();
  let { id } = useParams();
  const [displayPet, setDisplayPet] = useState({});
  const [isModifiable, setIsModifiable] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showAddSignalAnnonce, setShowAddSignalAnnonce] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const handleCloseNotif = () => setShowNotif(false);
  const [newPets, setNewPets] = useState([]);
  const [helpGive,sethelpGive] = useState(true);
  const [annonce, setAnnonce] = useState({
    DateBegin: "",
    DateEnd: "",
    Pets: [
      {
        Name: "",
        Type: "",
        Race: "",
        Age: "",
        Sexe: "",
        Weight: 0,
        Height: "",
        User: {
          Firstname: "",
          City: "",
        },
        PetsAnnonces: {
          createdAt: "",
          updatedAt: "",
          AnnonceId: 0,
          PetId: 0,
        },
      },
    ],
  });

  /*Appelle la fonction getDetailAnnonce au début du composant*/
  useEffect(() => {
    getDetailAnnonce();
    // eslint-disable-next-line
  }, []);

  /*
   * Affiche l'animal par défault dans displayPet
   * Vérifie si l'annonce est modifiable ou non
   */
  useEffect(() => {
    setDisplayPet(annonce.Pets[0]);
    let id = JSON.parse(localStorage.getItem("user")) === null ? 0 : JSON.parse(localStorage.getItem("user")).id;

    annonce.Pets[0].User.id === id
      ? setIsModifiable(true)
      : setIsModifiable(false);
  }, [annonce]);

  /*
   * Vérifie si la personne ne c'est pas encore proposer pour cette annonce
   */
  useEffect(() => {
    getHelpGived(JSON.parse(localStorage.getItem("user")).id,annonce.id);
    // eslint-disable-next-line
  }, [annonce]);

  /*
   *Appelle la fonction qui appelle les animaux du user
   */
  useEffect(() => {
    getPet(annonce.Pets[0].User.id);
    // eslint-disable-next-line
  }, [showAddPetModal]);


  function getDetailAnnonce() {
    /*
     *   Récupère les détails d'une annonce
     */
    fetch(config.API_URL + "/annonces/detailAnnonce?id=" + id)
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          //si l'annonce est inactive
          navigate('/');
        }
        else {
          setAnnonce(data);
        }

      });
  }

  function getHelpGived(idUser,idAnnonce){
    fetch(config.API_URL + "/notifications/checkhelp?idUser="+idUser+'&idAnnonce='+idAnnonce)
      .then((response) => response.json())
      .then((data) => {
        sethelpGive(data);
      });
  }

  function getPet(id) {
    /*
     *   Récupère les animaux d'un user
     */
    fetch(config.API_URL + "/pets/info/" + id)
      .then((response) => response.json())
      .then((data) => {
        setNewPets(data);
      });
  }

  function sendNewAnnonce() {
    /*
     *   Envoie les modifications de l'annonce
     */
    fetch(config.API_URL + "/annonces/updateAnnonce", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(annonce)
    })
  }

  function deleteAnimal(index) {
    /*
     *   Supprime un animal de l'annonce
     */
    if (annonce.Pets.length > 1) {
      setAnnonce({
        ...annonce,
        Pets: annonce.Pets.filter((_, i) => i !== index),
      });
    } else {
      alert("Vous ne pouvez pas supprimer le dernier animal");
    }
  }

  function deleteAnnonce(index) {
    /*
     *   Supprime une annonce
     */
    // eslint-disable-next-line no-restricted-globals
    let beSure = confirm("Voulez-vous vraiment supprimer cette annonce ?");
    if (beSure) {
      fetch(config.API_URL + "/annonces/deleteAnnonce?id=" + index);
      alert("Annonce bien supprimée.");
      navigate('/mesannonces');

    }
  }

  function sendHelp(idAnnonce,idHelper){
    fetch(config.API_URL+'/notifications/sendhelp' ,{
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        idAnnonce: idAnnonce,
        idHelper: idHelper
      })
    }).then((response) => response.json())
      .then(() => {getDetailAnnonce();});
  }

  return (
    <div className="DetailAnnonce">
      <CustomNavbar
        textLinkOne="Je propose mon aide"
        linkOne="/propositions"
        textLinkTwo="J'ai besoin d'aide"
        linkTwo="/annonces"
        textLinkThree="S'inscrire"
        linkThree="/register"
        textLinkFour="Se connecter"
        linkFour="/login"
        color="rgba(47, 72, 88, 1)"
      />
      <Container fluid className="top-container">
        <Row>
          <Col xs={{ span: 3, offset: 2 }}>
            <ReturnButton />
          </Col>
          {isModifiable ? (
            <Col xs={{ span: 3, offset: 3 }}>
              <Button
                className="edit-button"
                onClick={
                  editionMode
                    ? (e) => {
                      sendNewAnnonce();
                      setEditionMode(false);
                    }
                    : (e) => setEditionMode(true)
                }
              >
                {editionMode ? "Valider" : "Modifier"}
              </Button>
            </Col>
          ) :
            null
          }
          {isModifiable===false&& JSON.parse(localStorage.getItem("user")) !== null ? (
            <Col xs={{ span: 3, offset: 3 }}>
              <Button
                className="signal-button"
                onClick={
                  () => setShowAddSignalAnnonce(true)
                }
              >
                Signaler
              </Button>
            </Col>
          ) :
            null
          }



          {isModifiable ? (
            <Col xs={{ span: 3, offset: 8 }}>
              <Button className="delete-button" onClick={() => deleteAnnonce(annonce.id)}>Supprimer</Button>
            </Col>
          ) : helpGive ? <Col xs={{ span: 3, offset: 8 }}>
                <Button variant="success" className="proposition-button" onClick={() => {sendHelp(annonce.id,JSON.parse(localStorage.getItem("user")).id);setShowNotif(true);}}>proposer</Button>
              </Col> : null
        }

        </Row>
      </Container>
      <Container className="detail-container">
        <Container fluid>
          <Row>
            <Col>
              <h3>
                Annonce de
                {annonce.Pets.map((pet, index) => {
                  return index <= 0 ? (
                    <span key={index}>{" " + pet.Name}</span>
                  ) : index === annonce.Pets.length - 1 ? (
                    <span key={index}>{" et " + pet.Name}</span>
                  ) : (
                    <span key={index}>{", " + pet.Name}</span>
                  );
                })}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              {editionMode ? (
                <span className="date-picker-container">
                  à surveiller du
                  <Form.Control
                    type="date"
                    className="date-input-edit-annonce"
                    value={annonce.DateBegin.slice(0, 10)}
                    onChange={(e) =>
                      setAnnonce({
                        ...annonce,
                        DateBegin: e.target.value.slice(0, 10),
                      })
                    }
                  />
                  au
                  <Form.Control
                    type="date"
                    className="date-input-edit-annonce"
                    value={annonce.DateEnd.slice(0, 10)}
                    onChange={(e) =>
                      setAnnonce({
                        ...annonce,
                        DateEnd: e.target.value.slice(0, 10),
                      })
                    }
                  />
                </span>
              ) : (
                <span>
                  à surveiller du {annonce.DateBegin.slice(5, 10)} au{" "}
                  {annonce.DateEnd.slice(5, 10)}
                </span>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Propriétaire : {annonce.Pets[0].User.Firstname}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>
                {editionMode ? (
                  <>
                    Description :{" "}
                    <Form.Control
                      as="textarea"
                      type="text"
                      value={annonce.Comment}
                      onChange={(e) =>
                        setAnnonce({ ...annonce, Comment: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>Description : {annonce.Comment}</>
                )}
              </h5>
            </Col>
          </Row>

          <Row>
            {annonce.Pets.map((pet, index) => {
              return index <= 3 ? (
                <Col
                  xs={6}
                  sm={3}
                  key={index}
                  onClick={(e) => setDisplayPet(pet)}
                  className="pet-image-container"
                >
                  <img
                    className={"pet-image"}
                    src={AnimauxImages[pet.Type]}
                    alt=""
                  ></img>
                  {editionMode ? (
                    <img
                      src={xIcon}
                      alt="supprimer l'animal"
                      onClick={(e) => deleteAnimal(index)}
                      className="x-icon"
                    ></img>
                  ) : null}
                </Col>
              ) : (
                <></>
              );
            })}
            {editionMode && annonce.Pets.length < 4 ? (
              <Col>
                <Button
                  className="add-pet-button"
                  onClick={(e) => {
                    setShowAddPetModal(true);
                  }}
                >
                  <img
                    src={addButton}
                    alt="ajouter un animal"
                    className="add-pet-button-icon"
                  ></img>
                </Button>
              </Col>
            ) : null}
          </Row>

          <Row>
            <Col className="pet-name">
              {displayPet.Name + ", " + displayPet.Age}
            </Col>
          </Row>
          <Row>
            <Col>{displayPet.Race}</Col>
          </Row>
          <Row>
            <Col sm={1}>
              <img
                src={DogIcon}
                className={displayPet.DogFriendly ? "green-icon" : "red-icon"}
                width="30"
                height="30"
                alt="Dog Icon"
              ></img>
            </Col>
            <Col sm={1}>
              <img
                src={CatIcon}
                className={displayPet.CatFriendly ? "green-icon" : "red-icon"}
                width="30"
                height="30"
                alt="Cat Icon"
              ></img>
            </Col>
            <Col sm={1}>
              <img
                src={BabyIcon}
                className={displayPet.BabyFriendly ? "green-icon" : "red-icon"}
                width="30"
                height="30"
                alt="Baby Icon"
              ></img>
            </Col>
          </Row>
          <Row>
            <Col>{displayPet.Comment}</Col>
          </Row>
        </Container>
      </Container>

      <AddPetModal
        show={showAddPetModal}
        onHide={() => setShowAddPetModal(false)}
        pets={newPets}
        annonce={annonce}
        editannonce={setAnnonce}
      ></AddPetModal>
      <Modal
      show={showNotif}
      onHide={handleCloseNotif}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
          Proposition envoyée
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div>
              <h4>Opération réussi !</h4>
              <p>La Proposition à bien été envoyée.</p>
              <Button className='centrePage' onClick={handleCloseNotif}>OK</Button></div>
      </Modal.Body>
    </Modal>
      {isModifiable===false && JSON.parse(localStorage.getItem("user")) !== null ? (
        <AddSignalement
          show={showAddSignalAnnonce}
          onHide={() => setShowAddSignalAnnonce(false)}
          idSuspect={annonce.Pets[0].User.id}
          idUser={JSON.parse(localStorage.getItem("user")).id}
          type="alertAnnonce"
        ></AddSignalement>
      ) :
        null
      }
      <Footer/>
    </div>
  );
}

export { DetailAnnonce };
