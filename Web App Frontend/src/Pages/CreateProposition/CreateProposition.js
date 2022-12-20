/*External Import*/
import React from "react";
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Footer from '../../Components/Footer/Footer';

/*Importing Components */
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Styles*/
import './CreateProposition.css';

/*Importing Config*/
import config from "../../config.json";


function CreateProposition() {

    let navigate = useNavigate();

    function sendFormProposition(event) {
        const user = JSON.parse(localStorage.getItem("user"));
        fetch(config.API_URL + "/Propositions", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: (
                JSON.stringify({
                    Type: event['type'],
                    Frequency: event['frequency'],
                    Animal: event['animal'],
                    Number: event['number'],
                    UserId: user.id
                })
            ),
        }).then(val => val.json())
            .then(res => {
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (

        <div className={"CreateProposition"}>
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                color="rgba(47, 72, 88, 1)"
                position="absolute"
            />
            <Container>
                <div className="formPet">
                    <h1>Comment souhaitez-vous aider ?</h1>
                    <Formik
                        initialValues={{
                            type: '',
                            frequency: '',
                            animal: '',
                            number: '',
                        }}
                        onSubmit={sendFormProposition}
                        validationSchema={Yup.object({
                            type: Yup.string()
                                .required('Champ obligatoire')
                                .oneOf(['Promenade', 'Logement', 'Garde à domicile', 'Soins à domicile'], 'Type invalide'),
                            frequency: Yup.string()
                                .required('Champ obligatoire')
                                .oneOf(['Occasionnelle', 'Régulière'], 'Fréquence invalide'),
                            animal: Yup.string()
                                .required('Champ obligatoire')
                                .oneOf(['Chien', 'Chat', 'Rongeur', 'Oiseau', 'Poisson', 'NAC'], 'Animal invalide'),
                            number: Yup.number()
                                .required('Champ obligatoire')
                                .min(1, 'Nombre invalide')
                                .max(10, 'Nombre invalide'),
                        })}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Type d'aide</Form.Label>
                                        <Form.Select name="type"
                                            data-testid="type"
                                            value={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.type && touched.type}
                                            isInvalid={touched.type && errors.type}>
                                            <option value="no-value">Sélectionner le type d'aide</option>
                                            <option value="Promenade">Promenade</option>
                                            <option value="Logement">Logement</option>
                                            <option value="Garde à domicile">Garde à domicile</option>
                                            <option value="Soins à domicile">Soins à domicile</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.type}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Fréquence de l'aide</Form.Label>
                                        <Form.Select name="frequency"
                                            data-testid="frequency"
                                            value={values.frequency}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.frequency && touched.frequency}
                                            isInvalid={touched.frequency && errors.frequency}>
                                            <option value="no-value">Sélectionner la fréquence</option>
                                            <option value="Occasionnelle">Occasionnelle</option>
                                            <option value="Régulière">Régulière</option>
                                        </Form.Select>
                                        <Form.Control.Feedback frequency="invalid">
                                            {errors.frequency}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Animal souhaité</Form.Label>
                                        <Form.Select name="animal"
                                            data-testid="animal"
                                            value={values.animal}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.animal && touched.animal}
                                            isInvalid={touched.animal && errors.animal}>
                                            <option value="no-value">Sélectionner le type d'animal</option>
                                            <option value="Chien">Chien</option>
                                            <option value="Chat">Chat</option>
                                            <option value="Rongeur">Rongeur</option>
                                            <option value="Oiseau">Oiseau</option>
                                            <option value="Poisson">Poisson</option>
                                            <option value="NAC">NAC</option>
                                        </Form.Select>
                                        <Form.Control.Feedback animal="invalid">
                                            {errors.animal}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Prise en charge maximum</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="number"
                                            data-testid="number"
                                            value={values.number}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.number && touched.number}
                                            isInvalid={touched.number && errors.number}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.number}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button className='submit-button' type="submit"
                                    data-testid="submit"
                                    multiple>Enregistrer</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
            <Footer/>
        </div >
    )
}


export default CreateProposition;