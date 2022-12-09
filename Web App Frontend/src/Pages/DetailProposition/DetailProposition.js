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
    Frequence: "",
    Animal: "",
    Nombre: 0,
    User: [
      {
        Firstname: "",
        Age: 0,
        City: "",
        Postal: 0,
        Pets: [
          {
            Name: "",
            Type: "",
            Race: "",
            Age: "",
            Sexe: "",
            Weight: 0,
            Height: "",
      }]
      },
    ],
  });

  /*Appelle la fonction getDetailProposition au début du composant*/
  useEffect(() => {
    getDetailProposition();
    // eslint-disable-next-line
  }, []);

  /*
   * Prends tout les animaux du user qui a fait la proposition et le mets dans allPetsUser
   * Mets ensuite le premier animal dans displayPet (l'animal qui va être affiché en premier)
   * Vérifie si la proposition est modifiable ou non
   */
  useEffect(() => {
    setDisplayPet(proposition.User.Pets[0]);

    let id = JSON.parse(localStorage.getItem("user")) === null ? 0 : JSON.parse(localStorage.getItem("user")).id;
    proposition.User.id === id
      ? setIsModifiable(true)
      : setIsModifiable(false);

      console.log(proposition.User)
  }, [proposition]);






  function getDetailProposition() {
    /*
     *   Récupère les détails d'une proposition
     */
    fetch(config.API_URL + "/propositions/detailProposition?id=" + id)
      .then((response) => response.json())
      .then((data) => {
        setProposition(data);
      });
  }

  function updateProposition() {
    /*
     *   Envoie les modifications de la proposition
     */
    fetch(config.API_URL + "/propositions/updateProposition", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proposition)
    })
  }

  function deleteProposition(index) {
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
                    <Form.Control
                      as="textarea"
                      type="text"
                      value={proposition.Type}
                      onChange={(e) =>
                        setProposition({ ...proposition, Type: e.target.value })
                      }
                    />
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
                    <Form.Control
                      as="textarea"
                      type="text"
                      value={proposition.Frequence}
                      onChange={(e) =>
                        setProposition({ ...proposition, Frequence: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>Fréquence : {proposition.Frequence}</>
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
                      as="textarea"
                      type="number"
                      value={proposition.Nombre}
                      onChange={(e) =>
                        setProposition({ ...proposition, Nombre: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>Pour garder {proposition.Nombre}</>
                )}

                {editionMode ? (
                  <>
                    {" "}
                    <Form.Control
                      as="textarea"
                      type="text"
                      value={proposition.Animal}
                      onChange={(e) =>
                        setProposition({ ...proposition, Animal: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <> {proposition.Animal.toLowerCase()}(s)</>
                )}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
            <h5>Les animaux de la personne</h5>
          </Col>
          </Row>
          <Row>
              {proposition.User[0].Pets.map((pet, index) => {
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

                  </Col>
                ) : (
                  <></>
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
