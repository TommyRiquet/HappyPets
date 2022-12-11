import {  Row, Col, Button, Modal } from "react-bootstrap";

import './AddPetModal.css';

/*Importing Assets*/
import AnimauxImages from "../../AnimalPictures.js";

function AddPetModal(props) {
    function addPetToAnnonce(id) {
      /*
       *   Ajoute l'animal correspondant à l'id reçu à l'annonce
       *  @id : id de l'animal à ajouter 
       */
      if (props.annonce.Pets.length < 4) {
        let newAnnonce = props.annonce;
        newAnnonce.Pets.push(props.pets.filter((pet) => pet.id === id)[0]);
        props.editannonce(newAnnonce);
        props.onHide();
      }
    }

    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ajouter un animal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Vos Animaux :</h4>
          <Row xs={1} md={2} data-testid="list-pets">
            {props.pets.length === 0 ? ( // Si l'utilisateur n'a pas d'animaux en plus de ceux dans l'annonce
              <Col>
                <h5>Aucun animal :/</h5>
              </Col>
            ) : (
              /*
              *  Affiche les animaux de l'utilisateur en enlevant ceux déjà dans l'annonce
              */
              Object.values(props.pets).filter((pet) => !Object.values(props.annonce.Pets).map((pet) => pet.id).includes(pet.id))
              .map((pet, index) => {
                return (
                  <Col
                    key={index}
                    className="pet-image-modal-col"
                    onClick={(e) => addPetToAnnonce(pet.id)}
                  >
                    <img
                      src={AnimauxImages[pet.Type]}
                      alt=""
                      className="pet-image-modal"
                    ></img>
                    <span>{pet.Name}</span>
                  </Col>
                );
              })
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="edit-button" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default AddPetModal;
