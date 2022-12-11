/*Importing Components */
import { useState, useEffect} from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';
import AddPetModal from "../../Components/AddPetModal/AddPetModal";

/*Importing Styles*/
import './NewAnnonce.css';

/*Importing Config*/
import config from "../../config.json";

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";
import xIcon from "../../Assets/x-button.png";




function NewAnnonce() {
    const [showAddPetModal, setShowAddPetModal] = useState(false);
    const [newPets, setNewPets] = useState([]);
    const [annonce, setAnnonce] = useState({
        DateBegin: "",
        DateEnd: "",
        Type: "Promenade",
        Pets: [],
      });
    let navigate = useNavigate();


    useEffect(() => {
        getPet();
        // eslint-disable-next-line
      }, [showAddPetModal]);
      


    function handleSubmit(event) {
        event.preventDefault();

        fetch(config.API_URL + '/annonces', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                Type: annonce.Type,
                Comment: annonce.Comment,
                DateBegin: annonce.DateBegin,
                DateEnd: annonce.DateEnd,
                PetId: annonce.Pets,
            })
        })
            .then(response => {
                if (response.ok) {
                    navigate('/annonces')
                } else {
                    console.log("Erreur")
                }
            })

    }

    function getPet() {
        /*
         *   Récupère les animaux d'un user
         */
        let id = JSON.parse(localStorage.getItem("user")) === null ? 0 : JSON.parse(localStorage.getItem("user")).id;

        fetch(config.API_URL + "/pets/info/" + id)
          .then((response) => response.json())
          .then((data) => {
            setNewPets(data);
          });
      }

      function deleteAnimal(index) {
        /*
         *   Supprime un animal de l'annonce
         */
          setAnnonce({
            ...annonce,
            Pets: annonce.Pets.filter((_, i) => i !== index),
          });
      }

    return (
        <div className="NewAnnonces">
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                color="rgba(47, 72, 88, 1)"
            />
            <div className="newAnnonces-container">
                <Container>
                    <h2>Nouvelle Annonce</h2>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <Row>
                                    <Col xs={6} sm={4} md={3} lg={2} xl={2} xxl={2}>
                                        <label htmlFor="FormControlPets">Animaux</label>
                                        {annonce.Pets.map((pet, index) => {
                                            if(pet.Type !== ""){
                                                return (
                                                    <div key={index} className="pet-image-container-new-annonce">
                                                        <img
                                                            className={"pet-image"}
                                                            src={AnimauxImages[pet.Type]}
                                                            alt=""
                                                        ></img>
                                                        <img
                                                          src={xIcon}
                                                          alt="supprimer l'animal"
                                                          onClick={(e) => deleteAnimal(index)}
                                                          className="x-icon"
                                                        ></img>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })
                                        }
                                    </Col>
                                    <Col xs={2} sm={3} md={2} lg={3} xl={2} xxl={2}>
                                        {
                                            annonce.Pets.length < 4 ?
                                            <>
                                                <label></label>
                                                <input type="button" onClick={e=>setShowAddPetModal(true)} className="form-control form-control-addbutton" value='+'></input>
                                            </>
                                            :
                                            null
                                        }
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col className='radio-col'>
                                                <Row>
                                                    <Col>
                                                    <Form.Label htmlFor="FormControlCalendar">Type d'annonce</Form.Label>

                                                            <Form.Select aria-label="Default select example" onChange={
                                                                e => {  
                                                                    setAnnonce({
                                                                        ...annonce,
                                                                        Type: e.target.value,
                                                                    });
                                                                }
                                                            }>
                                                                <option value="Promenade">Promenade</option>
                                                                <option value="Soins à domicile">Soins à domicile</option>
                                                                <option value="Garde à domicile">Garde à domicile</option>
                                                                <option value="Logement">Logement</option>
                                                            </Form.Select>

                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Form.Group>
                                                <Form.Label htmlFor="FormControlCalendar">Calendrier</Form.Label>
                                                <Row>
                                                    <Col md>
                                                        <Form.Control required id="FormControlCalendarBegin" type="date" placeholder="DateDebut" onChange={
                                                                e => {  
                                                                    setAnnonce({
                                                                        ...annonce,
                                                                        DateBegin: e.target.value,
                                                                    });
                                                                }
                                                            }/>
                                                    </Col>
                                                    {">"}
                                                    <Col md>
                                                        <Form.Control required id="FormControlCalendarEnd" type="date" placeholder="DateFin" 
                                                        onChange={
                                                            e => {  
                                                                setAnnonce({
                                                                    ...annonce,
                                                                    DateEnd: e.target.value,
                                                                });
                                                            }
                                                        }/>

                                                    </Col>
                                                </Row>
                                            </Form.Group>

                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{ width: "100%" }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="FormControlComment"></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                id="Comment"
                                                placeholder="Commentaire"
                                                style={{ height: '100px' }}
                                                onChange={
                                                    e => {  
                                                        setAnnonce({
                                                            ...annonce,
                                                            Comment: e.target.value,
                                                        });
                                                    }
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='p-3'>
                                        <Button className='submit-button' type="submit" variant="">Enregistrer</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>

            <AddPetModal
                show={showAddPetModal}
                onHide={() => setShowAddPetModal(false)}
                pets={newPets}
                annonce={annonce}
                editannonce={setAnnonce}
            ></AddPetModal>

        </div>
    );
}


export default NewAnnonce;
