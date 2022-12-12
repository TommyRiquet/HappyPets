import {Button, Modal, Form } from "react-bootstrap";

import './AddSignalAnnonce.css';

function AddSignalAnnonce(props) {
    function addSignalAnnonce(id, comment) {
      /*
       *   Envoie le signalement à la DB
       *  @id : id du user qui a l'annonce
       *  @comment : commentaire rapporté 
       */
      props.onHide();
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
            Signalez une annonce
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="signalementDescription">
              <Form.Label>Décrivez votre signalement:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button className="edit-button" onClick={()=>addSignalAnnonce(props.idUser, document.getElementById("signalementDescription").value)}>
            Envoyer
          </Button>
          <Button className="edit-button" onClick={props.onHide}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default AddSignalAnnonce;
