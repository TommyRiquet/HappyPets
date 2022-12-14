/*Importing Components*/
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReturnButton from "../../Components/ReturnButton/ReturnButton";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

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
        else {
          setProposition(data);
        }

      });
  }

  function updateProposition() {
    /*
     *   Envoie les modifications de la proposition
     */
    
    //test si tout les champs sont du bon type
    proposition.Number=Number(proposition.Number);
    if(typeof(proposition.Type)==="string" && typeof(proposition.Frequency)==="string" && typeof(proposition.Animal)==="string" && typeof(proposition.Number)==="number"){
      //test si le nombre est bien entre 0 et 10
      if(proposition.Number>0 && proposition.Number<=10){
        //test si les valeurs sont bien celles proposées
        if(["Promenade", "Logement", "Garde à domicile", "Soins à domicile"].includes(proposition.Type) && ["Occasionnelle", "Régulière"].includes(proposition.Frequency) && ["Chien", "Chat", "Rongeur", "Oiseau", "Poisson", "NAC"].includes(proposition.Animal)){
            fetch(config.API_URL + "/propositions/updateProposition", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(proposition)
            })
        }
        else{
          alert("Mauvaise données envoyées");
          window.location.reload(false);
        }

      }
      else{
        alert("Vous ne pouvez garder maximum 10 animaux");
        window.location.reload(false);
      }

    }
    else{
      alert("Problèmes avec les données entrées");
      window.location.reload(false);
    }

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
        position="absolute"
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
          {isModifiable ? (
            <Col xs={{ span: 3, offset: 8 }}>
              <Button className="delete-button" onClick={() => deleteProposition(proposition.id)}>Supprimer</Button>
            </Col>
          ) : null}
        </Row>
      </Container>
      <Container className="detail-container">
        <Container fluid>
          <Row>
            <Col>
              <h3>
                Proposition de {proposition.User.Firstname}, {proposition.User.Age} ans
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
        </Container>
      </Container>
    </div >
  );
}


export { DetailProposition };
