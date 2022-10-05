/*Importing Styles*/
import './UserForm.css';

/*Importing Components */
import {Container,Button, Form, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';


function inputControl(Nom, Prenom, Age, Ville, Postal, Mail, Phone, Pwd, Pwd2){
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    if (Nom === "" || Prenom === "" || Ville === "" || Mail === "" || Phone === "" || Pwd === "" || Postal === ""){
        alert("Il faut remplir tout les champs");
        return false;
    }
    else if (Nom.length <= 25){
        let temp = Nom.split('');
        for (let k in temp){
            if (parseInt(temp[k])){
                alert("Le nom contient des caratère interdis.");
                return false;
            }
        }
    }
    if (Prenom.length <= 25){
        let temp = Nom.split('');
        for (let k in temp){
            if (parseInt(temp[k])){
                alert("Le prénom contient des caratère interdis.");
                return false;
            }
        }
    }
    if (Ville){
        let temp = Ville.split('');
        for (let k in temp){
            if (parseInt(temp[k])){
                alert("La ville contient des caratère interdis.");
                return false;
            }
        }
    }
    if (Pwd.length < 8){
        alert("Mots de passe de 8 caractère minimum.");
        return false;
    }
    else if (Pwd.length >= 8)
    {
        let temp = Pwd.split('');
        let Count = 0;
        for (let k in temp){
            if (parseInt(temp[k])){
                Count++;
            }
        }
        if (Count < 2){
            alert("2 chiffre minimum dans le mot de passe");
            return false;
        }
    }
    if (Pwd !== Pwd2){
        alert("2 Mots de passe different entrée.");
        return false;
    }
    if(Age <18){
        alert("Il faut etre minimum agé de 18 ans pour pouvoir s'inscrire");
        return false;
    }
    else if(!reg.test(Mail)){
        alert("L'addresse mail est incorrect");
        return false;
    }
    else{
        return true;
    }
  }

function UserForm() {

    let navigate = useNavigate();

    async function handleSubmit(data){
    data.preventDefault();
    if(inputControl(data.target['Nom'].value,data.target['Prenom'].value,data.target['Age'].value,data.target['Ville'].value,data.target['Postal'].value,data.target['Mail'].value,data.target['Telephone'].value,data.target['pwd'].value,data.target['pwd2'].value)){
        if(data.target['Condition'].checked){
            await axios.post('http://localhost:3001/users',{ 
                LastName: data.target['Nom'].value, 
                FirstName: data.target['Prenom'].value,
                Age: data.target['Age'].value,
                Ville: data.target['Ville'].value,
                Postal: data.target['Postal'].value,
                Email: data.target['Mail'].value,
                Phone: data.target['Telephone'].value,
                Role: 0,
                Password: data.target['pwd'].value,
                PhotoLink: 0,
                createdAt: '29-09-22',
                updatedAt: '29-08-22'
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else
        {
            alert("Accepter les condition d'utilisation");
            return false;
        }
    }
    navigate('/');

}
    return (
        <div className="UserForm">
            <Container>
                <h2>Page d'inscription</h2>
                <div>
                    <Form id="User" onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="6">
                                <Form.Label>Nom:</Form.Label>
                                <Form.Control type={'text'} id={"Nom"} name={"Nom"} placeholder={'Ex: Jean'} maxLength={'25'} required />
                            </Col>
                            <Col sm="6">
                                <Form.Label>Prénom:</Form.Label>
                                <Form.Control type={'text'} name={"Prenom"} placeholder={'Ex: Dupuis'}  maxLength={'25'} required />
                            </Col>
                        </Form.Group>            
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="8">
                                <Form.Label>Ville:</Form.Label>
                                <Form.Control type={'text'} name={"Ville"} placeholder={'Ex: Wavre'} required />
                            </Col>
                            <Col sm="4">
                                <Form.Label>Code Postal:</Form.Label>
                                <Form.Control type={'number'} name={"Postal"} placeholder={'Ex: 1300'} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="12">
                                <Form.Label>Adresse Mail:</Form.Label>
                                <Form.Control type={'email'} name={"Mail"} placeholder={'Ex: J.dupuis@hotmail.fr'} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="8">
                                <Form.Label>Numéro de téléphone:</Form.Label>
                                <Form.Control type={'number'} name={"Telephone"} placeholder={'Ex: 04********'} required />
                            </Col>
                            <Col sm="4">
                                <Form.Label>Age:</Form.Label>
                                <Form.Control type={'number'} name={"Age"} placeholder={'Age'} maxLength={'3'} required />
                            </Col>
                        </Form.Group>  
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="12">
                                <Form.Label>Mot de passe:</Form.Label>
                                <Form.Control type={'password'} name={"pwd"} placeholder={'Mot de passe'} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Col sm="12">
                                <Form.Label>Confirmer le mot de passe:</Form.Label>
                                <Form.Control type={'password'} name={"pwd2"} placeholder={'Confirmation Mot de passe'} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Col sm="12">
                                <Form.Label>Photo de Profil:</Form.Label>
                                <Form.Control type="file" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="12">
                                <Form.Check type={'switch'} name={'Condition'} label={"J'accepte les conditions d'utilisation."} />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button className='UserDB' type="submit">Envoyer</Button>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default UserForm;
