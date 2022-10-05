import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './FormPet.css'


function FormPet() {
    let navigate = useNavigate();

    function sendFormPet(event) {
        axios.post("http://localhost:3001/pets", {
            Name: event.target[0].value,
            Type: event.target[1].value,
            Race: event.target[2].value,
            Age: event.target[3].value,
            Weight: event.target[4].value,
            Height: event.target[5].value,
            Behaviour: event.target[6].value,
            Comment: event.target[7].value,
        }).then((res) => {
            event.preventDefault()
            if (res.data.error) {
                event.preventDefault()
                console.log(res.data.error)
            } else {
                console.log(res.data)
                navigate('/')
                window.location.reload()
            }
        })
    }

    return (
        <div className="formPet">
            <h1>Inscrivez votre animal</h1>
            <Formik
                initialValues={{
                    name: '',
                    type: '',
                    race: '',
                    age: '',
                    weight: '',
                    height: '',
                    behaviour: '',
                    comment: '',
                }}
                onSubmit={sendFormPet}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(25, 'Doit faire 25 caractères ou moins')
                        .min(2, 'Doit faire 2 caractères ou plus')
                        .required('Champ obligatoire'),
                    type: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['Chat', 'Chien', 'Lapin', 'Oiseau', 'Poisson', 'NAC'],
                            'Type invalide'
                        ),
                    race: Yup.string()
                        .max(25, 'Doit faire 25 caractères ou moins')
                        .min(3, 'Doit faire 3 caractères ou plus')
                        .required('Champ obligatoire'),
                    age: Yup.number()
                        .min(0, "l'âge ne peut être négatif")
                        .max(25, "l'âge doit être compris entre 0 et 25 ans")
                        .required('Champ obligatoire'),
                    weight: Yup.number()
                        .min(0, "le poids ne peut être négatif")
                        .max(100, "le poids doit être compris entre 0 et 100 kg")
                        .required('Champ obligatoire'),
                    height: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['Grand', 'Moyen', 'Petit'],
                            'Taille invalide'
                        ),
                    behaviour: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['Dominant', 'Dominé'],
                            'Caractère invalide'
                        ),
                    comment: Yup.string(),
                })}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>Type</Form.Label>
                                <Form.Select name="type"
                                             value={values.name}
                                             onChange={handleChange}
                                             isInvalid={!!errors.type}>
                                    <option>Sélectionner un type</option>
                                    <option value="Chat">Chat</option>
                                    <option value="Chien">Chien</option>
                                    <option value="Lapin">Lapin</option>
                                    <option value="Oiseau">Oiseau</option>
                                    <option value="Poisson">Poisson</option>
                                    <option value="NAC">NAC</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" >
                                    {errors.type}
                                </Form.Control.Feedback>
                            </Form.Group>


                        </Row>

                        <Row>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>Race</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="race"
                                    value={values.race}
                                    onChange={handleChange}
                                    isInvalid={!!errors.race}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    {errors.race}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group
                                as={Col}
                            >
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={values.age}
                                    onChange={handleChange}
                                    isInvalid={!!errors.age}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    {errors.age}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Poids</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="weight"
                                    value={values.weight}
                                    onChange={handleChange}
                                    isInvalid={!!errors.weight}
                                />
                                <Form.Control.Feedback type="invalid" >
                                    {errors.weight}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Taille</Form.Label>
                                <Form.Select name="height"
                                             value={values.height}
                                             onChange={handleChange}
                                             isInvalid={!!errors.height}
                                >
                                    <option>Sélectionner une taille</option>
                                    <option value="Grand">Grand</option>
                                    <option value="Moyen">Moyen</option>
                                    <option value="Petit">Petit</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" >
                                    {errors.height}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Caractère</Form.Label>
                                <Form.Select name="behaviour"
                                             value={values.behaviour}
                                             onChange={handleChange}
                                             isInvalid={!!errors.behaviour}>
                                    <option>Sélectionner un caractère</option>
                                    <option value="Dominant">Dominant</option>
                                    <option value="Dominé">Dominé</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" >
                                    {errors.behaviour}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Commentaire</Form.Label>
                                <Form.Control as="textarea" rows={3}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Button className='submit-button' type="submit">Inscrire l'animal</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormPet