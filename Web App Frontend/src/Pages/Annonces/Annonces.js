/*Importing Components */
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import AnimalCard from "../../Components/AnimalCard/AnimalCard";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import {useNavigate} from 'react-router-dom';

/*Importing Styles*/
import "./Annonces.css";

/*Importing Images*/
import sendButtonIcon from "../../Assets/sendButtonIcon.png";

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";

/*Importing Config*/
import config from "../../config.json";



function Annonces() {
  const [ListAnnonces, setListAnnonces] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTypeAnnonce, setSelectedTypeAnnonce] = useState([]);
  const [selectedCritere, setSelectedCritere] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  let navigate = useNavigate();

  useEffect(() => {
    /*
     * Ajoute un EventListener pour détecter le redimensionnement de la fenêtre
     * Ajoute un EventListener pour détecter le scroll de la fenêtre
     * Appele la fonction LoadAnnonces
     * @return la suppression des EventListeners
     */
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    LoadAnnonces();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    /*
     * Recharge les annonces lorsque l'offset change
     */
    LoadAnnonces(
      offset,
      limit,
      selectedTypes,
      selectedTypeAnnonce,
      selectedCritere
    );
    // eslint-disable-next-line
  }, [offset]);

  function LoadAnnonces(
    offset = 0,
    limit = 20,
    listOfType = [],
    listOfTypeAnnonce = [],
    listOfCritere = []
  ) {
    /*
     *   Fonction qui permet de charger les annonces
     *       @param offset : le nombre d'annonces à sauter
     *       @param limit : le nombre d'annonces à charger
     *       @param listOfType : la liste des types d'animaux à charger
     *       @param listOfTypeAnnonce : la liste des types d'annonces à charger
     *       @param listOfCritere : la liste des critères à charger
     */
    fetch(
      config.API_URL+"/annonces?" +
        "offset=" +
        offset +
        "&limit=" +
        limit +
        listOfType.map((typePet) => "&typePet=" + typePet).join("") +
        listOfTypeAnnonce
          .map((typeAnnonce) => "&typeAnnonce=" + typeAnnonce)
          .join("") +
        listOfCritere.map((critere) => "&" + critere + "=" + true).join("")
    )
      .then((response) => response.json())
      .then((data) => {
        if (offset === 0) {
          setListAnnonces(data);
          return;
        }

        setListAnnonces((ListAnnonces) => [...ListAnnonces, ...data]);
      });
  }

  function handleScroll(e) {
    /*
     *   Fonction qui permet de charger les annonces suivantes quand on arrive en bas de la page
     *      @param e : l'évènement scroll
     */
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      setOffset((offset) => offset + limit);
    }
  }

  function handleResize(e) {
    /*
     *   Fonction qui permet de récuperer la largeur de la page pour afficher les annonces en fonction de la largeur
     *      @param e : l'évènement resize
     */
    setWindowWidth(window.innerWidth);
  }

  return (
    <div className="Annonces">
      <CustomNavbar
        textLinkOne="Propositions"
        linkOne="/propositions"
        textLinkTwo="Annonces"
        linkTwo="/annonces"
        color="rgba(47, 72, 88, 1)"
      />
      <Container>
        <Container className="top-container" fluid>
          <Row>
            <Col>
              <h2>Animaux</h2>
            </Col>
          </Row>
          <Row className="filter-row">
            <Col xs={6} sm={6} md={3} lg={3} className="g-2">
              <Multiselect
                options={[
                  "Chien",
                  "Chat",
                  "Rongeur",
                  "Oiseau",
                  "Poisson",
                  "NAC",
                ]}
                placeholder="Type d'animal"
                isObject={false}
                onSelect={(_, selectedItem) => {
                  setSelectedTypes((SelectedTypes) => [
                    ...SelectedTypes,
                    selectedItem,
                  ]);
                }}
                onRemove={(_, removedItem) => {
                  setSelectedTypes(
                    selectedTypes.filter((item) => item !== removedItem)
                  );
                }}
                emptyRecordMsg="Aucun type d'animal trouvé"
                closeIcon="cancel"
              ></Multiselect>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="g-2">
              <Multiselect
                options={[
                  "Promenade",
                  "Logement",
                  "Garde à domicile",
                  "Soins à domicile",
                ]}
                placeholder="Type d'annonce"
                isObject={false}
                onSelect={(_, selectedItem) => {
                  setSelectedTypeAnnonce((SelectedTypeAnnonce) => [
                    ...SelectedTypeAnnonce,
                    selectedItem,
                  ]);
                }}
                onRemove={(_, removedItem) => {
                  setSelectedTypeAnnonce(
                    selectedTypeAnnonce.filter((item) => item !== removedItem)
                  );
                }}
                emptyRecordMsg="Aucun type d'annonce trouvé"
                closeIcon="cancel"
              ></Multiselect>
            </Col>
            <Col xs={6} sm={6} md={3} lg={2} className="g-2">
              <Multiselect
                options={[
                  { name: "Ok Chien", id: "DogFriendly" },
                  { name: "Ok Chat", id: "CatFriendly" },
                  { name: "Ok Enfant", id: "KidFriendly" },
                ]}
                placeholder="Autres critères"
                displayValue="name"
                onSelect={(_, selectedItem) => {
                  setSelectedCritere((SelectedCritere) => [
                    ...SelectedCritere,
                    selectedItem.id,
                  ]);
                }}
                onRemove={(_, removedItem) => {
                  setSelectedCritere(
                    selectedCritere.filter((item) => item !== removedItem.id)
                  );
                }}
                emptyRecordMsg="Aucun autre critère trouvé"
                closeIcon="cancel"
              ></Multiselect>
            </Col>
            <Col
              xs={4}
              sm={4}
              md={1}
              lg={1}
              className="new-annonce-button-col g-2"
            >
              <Button
                className="send-filter-button filter-button"
                variant=""
                onClick={(e) => {
                  setOffset(0);
                  LoadAnnonces(
                    offset,
                    20,
                    selectedTypes,
                    selectedTypeAnnonce,
                    selectedCritere
                  );
                }}
              >
                <img
                  src={sendButtonIcon}
                  width="25"
                  height="25"
                  alt="send-button"
                ></img>
              </Button>
            </Col>
            <Col sm={12} md={12} lg={3} className="new-annonce-button-col g-2">
              <Button
                className="new-annonce-button filter-button"
                variant=""
                href="annonces/new"
              >
                Nouvelle Annonce
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className="annonces-container" data-testid="list-annonce">
          {
            /*
             * when i wrote this code, only God and i understood what i was doing
             * now, God only knows
             */
            Object.keys(ListAnnonces).length === 0 ? (
              /*Si il n'y a pas d'annonces*/
              <h2 className="no-result-message">Aucun Résultat :/</h2>
            ) : /*Si il y a des annonces*/

            windowWidth >= 992 && ListAnnonces.length > 1 ? (
              /*Affichage pour les grands écrans*/
              <Row>
                <Col>
                  <Row xs={1}>
                    {ListAnnonces.map((annonce, index) => {
                      /*Colonne de gauche*/
                      return index % 2 === 0 ? (
                        <Col key={index} onClick={()=>navigate('/detailannonce/'+ annonce.id )}>
                        <AnimalCard
                            annonce={annonce}
                            image={annonce.Pets.map((pet) => {
                              const ReturnTable = AnimauxImages[pet.Type];
                              return ReturnTable;
                            })}
                          />
                        </Col>
                      ) : null;
                    })}
                  </Row>
                </Col>
                <Col>
                  <Row xs={1}>
                    {ListAnnonces.map((annonce, index) => {
                      /*Colonne de droite*/
                      return index % 2 === 1 ? (
                        <Col key={index} onClick={()=>navigate('/detailannonce/'+ annonce.id )}>
                          <AnimalCard
                            annonce={annonce}
                            image={annonce.Pets.map((pet) => {
                              const ReturnTable = AnimauxImages[pet.Type];
                              return ReturnTable;
                            })}
                          />
                        </Col>
                      ) : null;
                    })}
                  </Row>
                </Col>
              </Row>
            ) : (
              /*Affichage pour les petits écrans ou lorsqu'il n'y a qu'un seule item dans ListAnnonce*/
              <Row xs={1} sm={1}>
                {ListAnnonces.map((annonce, index) => {
                  return (
                    <Col key={index} onClick={()=>navigate('/detailannonce/'+ annonce.id )}>
                      <AnimalCard
                        annonce={annonce}
                        image={annonce.Pets.map((pet) => {
                          const ReturnTable = AnimauxImages[pet.Type];
                          return ReturnTable;
                        })}
                      />
                    </Col>
                  );
                })}
              </Row>
            )
          }
        </Container>
      </Container>
    </div>
  );
}

export default Annonces;
