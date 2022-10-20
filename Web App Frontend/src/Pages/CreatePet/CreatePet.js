/*External Import*/
import React, { useEffect, useState } from "react";
import {Container, Button, Row, Col, Form } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

/*Importing Components */
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Styles*/
import './CreatePet.css';


import ListAnimalRace from "../../Assets/race.json";

function CreatePet(){
    const [animalRace,setAnimalRace] = useState("");
    const [animalRaceProposition,setAnimalRaceProposition] = useState([]);	
    const [animalType,setAnimalType] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        /*
            Reset de la race de l'animal et des propositions lors du changement de type de l'animal
        */
        setAnimalRace("");
        setAnimalRaceProposition([]);
    },[animalType]);

    useEffect(() => {
        /*
            Si le type de l'animal est renseigné, on récupère les races de cette animal et on les place dans la
            variable d'état animalRaceProposition en regardant si la valeur entré correspond à une des races avec un regex
        */
        var reg = new RegExp(animalRace);
        try{
            const tempList = ListAnimalRace[animalType].filter((item) => {return reg.test(item)});
            if(tempList[0] !== animalRace && animalRace !== ""){
                setAnimalRaceProposition(tempList.slice(0,3));
            }else{
                setAnimalRaceProposition([])
            }
        }
        catch{
            setAnimalRaceProposition([]);
        }
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[animalRace]);



    function sendFormPet(event) {
        event.preventDefault()
        const bodyFormData = new FormData();

        bodyFormData.append('Name', event.target['name'].value)
        bodyFormData.append('Type', event.target['type'].value)
        bodyFormData.append('Race', event.target['race'].value)
        bodyFormData.append('Age', event.target['age'].value)
        bodyFormData.append('Weight', event.target['weight'].value)
        bodyFormData.append('Height', event.target['height'].value)
        bodyFormData.append('Behaviour', event.target['behaviour'].value)
        bodyFormData.append('Sex', event.target['sex'].value)
        bodyFormData.append('Comment', event.target['comment'].value)
        bodyFormData.append('Image', event.target['image'])
        console.log(bodyFormData)

        axios({
            method: "post",
            url: "http://localhost:3001/pets",
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                navigate('/')
            }
        })
    }


    return(
        <Container>
            <CustomNavbar />
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
                    sex: '',
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
                            ['Chat', 'Chien', 'Rongeur', 'Oiseau', 'Poisson', 'NAC'],
                            'Type invalide'
                        ),
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
                    sex: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['M', 'F', 'NC'],
                            'Sexe invalide'
                        ),
                    comment: Yup.string(),
                })}
            >
                {({
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched,
                  }) => (
                    <Form noValidate onSubmit={sendFormPet} encType="multipart/form-data">
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={errors.name && touched.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Caractère</Form.Label>
                                <Form.Select name="behaviour"
                                             value={values.behaviour}
                                             onChange={handleChange}
                                             isInvalid={touched.behavior && errors.behaviour}>
                                    <option>Sélectionner un caractère</option>
                                    <option value="Dominant">Dominant</option>
                                    <option value="Dominé">Dominé</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.behaviour}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Type</Form.Label>
                                <Form.Select name="type"
                                             value={values.type}
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             onInput={e=>setAnimalType(e.target.value)}
                                             isInvalid={errors.type && touched.type}
                                >
                                    <option value="no-value">Sélectionner un type</option>
                                    <option value="Chien">Chien</option>
                                    <option value="Chat">Chat</option>
                                    <option value="Rongeur">Rongeur</option>
                                    <option value="Oiseau">Oiseau</option>
                                    <option value="Poisson">Poisson</option>
                                    <option value="NAC">NAC</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.type}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Race</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="race"
                                            disabled={values.type === '' || values.type === 'NAC' || values.type === 'Poisson' || values.type === 'no-value'}
                                            value={animalRace}
                                            autoComplete="off"
                                            onChange={e=>setAnimalRace(e.target.value)}
                                            onBlur={handleBlur}
                                            isInvalid={touched.race && errors.race}
                                        />
                                        <div className="animal-proposition-container">
                                            {animalRaceProposition.map((item, index) => {
                                                return (
                                                    <div key={index} className="animal-proposition-items" onClick={() => {setAnimalRace(item)}}>
                                                        {item}
                                                    </div>
                                                )
                                            })}

                                        </div>

                                <Form.Control.Feedback type="invalid">
                                    {errors.race}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.age && errors.age}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.age}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Sexe</Form.Label>
                                <Form.Select name="sex"
                                             value={values.sex}
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             isInvalid={touched.sex && errors.sex}>
                                    <option>Sélectionner un sexe</option>
                                    <option value="M">Mâle</option>
                                    <option value="F">Femelle</option>
                                    <option value="NC">Non connu</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.sex}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Poids</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="weight"
                                    value={values.weight}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.weight && errors.weight}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.weight}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Taille</Form.Label>
                                <Form.Select name="height"
                                             value={values.height}
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             isInvalid={touched.height && errors.height}
                                >
                                    <option>Sélectionner une taille</option>
                                    <option value="Grand">Grand</option>
                                    <option value="Moyen">Moyen</option>
                                    <option value="Petit">Petit</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.height}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Commentaire</Form.Label>
                                <Form.Control name="comment" as="textarea" rows={3}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Photos</Form.Label>
                                <Form.Control name="image" type="file"/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col className={"div-button"}>
                                    <Button className='submit-button' type="submit" accept="image/*"
                                            multiple>Enregistrer</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
        </Container>
    )
}


export default CreatePet;