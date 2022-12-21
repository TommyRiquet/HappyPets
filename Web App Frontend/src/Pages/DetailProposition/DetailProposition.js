/*Importing Components*/
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSignalement from "../../Components/AddSignalement/AddSignalement";
import ReturnButton from "../../Components/ReturnButton/ReturnButton";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import Footer from '../../Components/Footer/Footer';

/*Importing Icons*/
import DogIcon from "../../Assets/dog-icon.png";
import CatIcon from "../../Assets/cat-icon.png";
import BabyIcon from "../../Assets/baby-icon.png";

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";

/*Importing Styles*/
import "./DetailProposition.css";

/*Importing Config*/
import config from "../../config.json";




function DetailProposition() {
  /*
    Cette page affiche les détails d'une proposition
    Elle est accessible depuis la page d'accueil
    Elle est accessible depuis la page de ses propres propositions
  */

  /*
   *   id : Récupération de l'id de la proposition depuis l'url
   *   isModifiable : Si la proposition est modifiable ou non (si le user possède la proposition)
   *   editionMode : Si la proposition est en mode édition ou non
   *   proposition : Proposition affichée
   */
  let navigate = useNavigate();
  let { id } = useParams();
  const [displayPet, setDisplayPet] = useState({});
  const [isModifiable, setIsModifiable] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [showAddSignalAnnonce, setShowAddSignalAnnonce] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const handleCloseNotif = () => setShowNotif(false);
  const [helpAsked, sethelpAsked] = useState(true);
  const [havePets, setHavePets] = useState(true);
  const [proposition, setProposition] = useState({
    Type: "",
    Frequency: "",
    Animal: "",
    Number: 0,
    User: {
      Firstname: "",
      Age: "",
      City: "",
      Postal: 0,
      Pets: [
        {
          Type: "",
          Name: "",
          Age: "",
          Race: "",
          DogFriendly: true,
          CatFriendly: true,
          KidFriendly: true,
          Comment: ""
        }
      ]
    }
  });

  /*Appelle la fonction getDetailAnnonce au début du composant*/
  useEffect(() => {
    getDetailProposition();
    // eslint-disable-next-line
  }, []);

  /*
   * Affiche l'animal par défault dans displayPet
   * Vérifie si l'annonce est modifiable ou non
   */
  useEffect(() => {
    setDisplayPet(proposition.User.Pets[0]);
    let id = JSON.parse(localStorage.getItem("user")) === null ? 0 : JSON.parse(localStorage.getItem("user")).id;

    proposition.User.id === id
      ? setIsModifiable(true)
      : setIsModifiable(false);
  }, [proposition]);

  /*
   * Vérifie si la personne ne c'est pas encore proposer pour cette proposition
   */
  useEffect(() => {
    getHelpAsked(JSON.parse(localStorage.getItem("user")) == null ? 0 : JSON.parse(localStorage.getItem("user")).id ,proposition.id);
    // eslint-disable-next-line
  }, [proposition]);


  function getDetailProposition() {
    /*
     *   Récupère les détails d'une proposition
     */
    fetch(config.API_URL + "/propositions/detailProposition?id=" + id)
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          //si l'annonce est inactive
          navigate('/');
        }
        else if (data.User.Pets.length === 0) {
          //si l'annonce n'a pas d'animal
          setHavePets(false);
          setProposition(data);
        } else {
          setProposition(data);
        }
      });
  }

  function getHelpAsked(idUser, idProposition) {
    fetch(config.API_URL + "/notifications/checkasked?idUser=" + idUser + '&idProposition=' + idProposition)
      .then((response) => response.json())
      .then((data) => {
        sethelpAsked(data);
      });
  }

  function updateProposition() {
    /*
     *   Envoie les modifications de la proposition
     */

    //test si tout les champs sont du bon type
    proposition.Number = Number(proposition.Number);
    if (typeof (proposition.Type) === "string" && typeof (proposition.Frequency) === "string" && typeof (proposition.Animal) === "string" && typeof (proposition.Number) === "number") {
      //test si le nombre est bien entre 0 et 10
      if (proposition.Number > 0 && proposition.Number <= 10) {
        //test si les valeurs sont bien celles proposées
        if (["Promenade", "Logement", "Garde à domicile", "Soins à domicile"].includes(proposition.Type) && ["Occasionnelle", "Régulière"].includes(proposition.Frequency) && ["Chien", "Chat", "Rongeur", "Oiseau", "Poisson", "NAC"].includes(proposition.Animal)) {
          fetch(config.API_URL + "/propositions/updateProposition", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(proposition)
          })
        }
        else {
          alert("Mauvaise données envoyées");
          window.location.reload(false);
        }

      }
      else {
        alert("Vous ne pouvez garder maximum 10 animaux");
        window.location.reload(false);
      }

    }
    else {
      alert("Problèmes avec les données entrées");
      window.location.reload(false);
    }

  }

  function askHelp(idProposition, idHelper) {
    fetch(config.API_URL + '/notifications/askhelp', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        idProposition: idProposition,
        idHelper: idHelper
      })
    }).then((response) => response.json())
      .then(() => { getDetailProposition(); });
  }

  function deleteProposition() {
    /*
     *   Supprime une proposition
     */
    // eslint-disable-next-line no-restricted-globals
    let beSure = confirm("Voulez-vous vraiment supprimer cette proposition ?");
    if (beSure) {
      fetch(config.API_URL + "/propositions/deleteProposition", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposition)
      })
      navigate("/")

    }
  }
  
  function Age(date){
    var an=date.substr(0,4);
    var mois=date.substr(5,2);
    var day= date.substr(8,2); 
    var dateNaissance = new Date(an + "-" + mois + "-" + day);

    var diff = Date.now() - dateNaissance.getTime();
    var age = new Date(diff); 

    return Math.abs(age.getUTCFullYear() - 1970)
  }

  return (
    <div className="DetailProposition">
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
                      updateProposition();
                      setEditionMode(false);
                    }
                    : (e) => setEditionMode(true)
                }
              >
                {editionMode ? "Valider" : "Modifier"}
              </Button>
            </Col>
          ) : null}
          {isModifiable === false && JSON.parse(localStorage.getItem("user")) !== null ? (
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
              <Button className="delete-button" onClick={() => deleteProposition(proposition.id)}>Supprimer</Button>
            </Col>
          ) : helpAsked && JSON.parse(localStorage.getItem("user")) != null? <Col xs={{ span: 3, offset: 8 }}>
          
          <Button variant="success" className="proposition-button" onClick={() => {askHelp(proposition.id,JSON.parse(localStorage.getItem("user")).id);setShowNotif(true);}}>Demander</Button>
        </Col> : null}
        </Row>
      </Container>
      <Container className="detail-container">
        <Container fluid>
          <Row>
            <Col>
              <h3>
                Proposition de {proposition.User.Firstname}, {Age(proposition.User.Age)} ans
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="city-container">{proposition.User.City},{proposition.User.Postal}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>
                {editionMode ? (
                  <>
                    Type :{" "}
                    <Form.Select name="type"
                      data-testid="type"
                      value={proposition.Type}
                      onChange={(e) =>
                        setProposition({ ...proposition, Type: e.target.value })
                      }>
                      <option value="Promenade">Promenade</option>
                      <option value="Logement">Logement</option>
                      <option value="Garde à domicile">Garde à domicile</option>
                      <option value="Soins à domicile">Soins à domicile</option>
                    </Form.Select>

                  </>
                ) : (
                  <>Type : {proposition.Type}</>
                )}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>
                {editionMode ? (
                  <>
                    Fréquence :{" "}
                    <Form.Select name="frequency"
                      data-testid="frequency"
                      value={proposition.Frequency}
                      onChange={(e) =>
                        setProposition({ ...proposition, Frequency: e.target.value })
                      }>
                      <option value="Occasionnelle">Occasionnelle</option>
                      <option value="Régulière">Régulière</option>
                    </Form.Select>
                  </>
                ) : (
                  <>Fréquence : {proposition.Frequency}</>
                )}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>
                {editionMode ? (
                  <>
                    Pour garder {" "}
                    <Form.Control
                      type="number"
                      name="number"
                      data-testid="number"
                      max="10"
                      min="1"
                      value={proposition.Number}
                      onChange={(e) =>
                        setProposition({ ...proposition, Number: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>Pour garder {proposition.Number}</>
                )}

                {editionMode ? (
                  <>
                    {" "}
                    <Form.Select name="animal"
                      data-testid="animal"
                      value={proposition.Animal}
                      onChange={(e) =>
                        setProposition({ ...proposition, Animal: e.target.value })
                      }
                    >
                      <option value="Chien">Chien</option>
                      <option value="Chat">Chat</option>
                      <option value="Rongeur">Rongeur</option>
                      <option value="Oiseau">Oiseau</option>
                      <option value="Poisson">Poisson</option>
                      <option value="NAC">NAC</option>
                    </Form.Select>
                  </>
                ) : (
                  <> {proposition.Animal.toLowerCase()}(s)</>
                )}
              </h5>
            </Col>
          </Row>
          {havePets ? (
            <>
              <Row>
                <Col>
                  <h3 className="person-animal">Les animaux de la personne</h3>
                </Col>
              </Row>
              <Row>
                {
                  proposition.User.Pets.map((pet, index) => {
                    return (
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

                      </Col>
                    );
                  })}
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
            </>
          ) : (<Row><Col><h3 className="person-animal">L'utilisateur n'a pas d'animaux</h3></Col> </Row>)}
        </Container>
      </Container>
      <Modal
        show={showNotif}
        onHide={handleCloseNotif}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Aide demandée
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Opération réussi !</h4>
            <p>La demande d'aide à bien été envoyée.</p>
            <Button className='centrePage' onClick={handleCloseNotif}>OK</Button></div>
        </Modal.Body>
      </Modal>

      {isModifiable === false && JSON.parse(localStorage.getItem("user")) !== null ? (
        <AddSignalement
          show={showAddSignalAnnonce}
          onHide={() => setShowAddSignalAnnonce(false)}
          idSuspect={proposition.User.id}
          idUser={JSON.parse(localStorage.getItem("user")).id}
          type="alertProposition"
        ></AddSignalement>
      ) :
        null
      }
      <Footer />
    </div >
  );
}


export { DetailProposition };
