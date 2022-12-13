import { Button, Modal, Form } from "react-bootstrap";
import config from '../../config.json';
import './AddSignalement.css';

function AddSignalement(props) {
  function addSignalement(idSuspect, idUser, comment, type) {
    /*
     *   Envoie le signalement à la DB
     *  @id : id du user qui a l'annonce
     *  @comment : commentaire rapporté 
     */
    if (comment !== "" && comment.length>=10 && comment.length<=200) {
      fetch(config.API_URL + "/admin", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'accessToken': localStorage.getItem("accessToken")
        },
        body: (
          JSON.stringify({
            Description: comment,
            Type: type,
            SuspectId: idSuspect,
            UserId: idUser
          }
          )
        ),
      }).then(val => val.json())
        .then((data) => {
          if (data === 200) {
            alert("Signalement bien envoyé !");
          }
          else {
            alert("Problème lors de l'envoi du signalement. Réessayez plus tard.");
          }
        });
        props.onHide();
    }
    else{
      alert("La description doit avoir entre 10 et 200 caractères.")
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
          Signalez une annonce
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="signalementDescription">
            <Form.Label>Décrivez votre signalement:</Form.Label>
            <Form.Control as="textarea" rows={3}  minLength={10} maxLength={200}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="edit-button" onClick={() => addSignalement(props.idSuspect, props.idUser, document.getElementById("signalementDescription").value, props.type)}>
          Envoyer
        </Button>
        <Button className="edit-button" onClick={props.onHide}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSignalement;
