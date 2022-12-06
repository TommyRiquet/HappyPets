/*Importing Components*/
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ReturnButton from "../../Components/ReturnButton/ReturnButton";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Icons*/
import { useNavigate } from "react-router-dom";
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
   *   isModifiable : Si l'annonce est modifiable ou non (si le user possède l'annonce)
   *   editionMode : Si l'annonce est en mode édition ou non
   *   annonce : Annonce affichée
   */
  let navigate = useNavigate();
  let { id } = useParams();
  const [displayAnnonce, setDisplayProposition] = useState({});
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
      },
    ],
  });

  /*Appelle la fonction getDetailProposition au début du composant*/
  useEffect(() => {
    getDetailProposition();
    // eslint-disable-next-line
  }, []);

  /*
   * Affiche la proposition par défault dans displayProposition
   * Vérifie si la proposition est modifiable ou non
   */
  useEffect(() => {
    setDisplayProposition(proposition);
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
        console.log()
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
          </Container>
          </Container>
    </div>
  );
}


export { DetailProposition};
