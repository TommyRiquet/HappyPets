/*External Import*/
import React, {useEffect, useState} from "react";
import {Container, Button, Row, Col, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';


/*Importing Components */
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Styles*/
import './CreatePet.css';

/*Importing Config*/
import config from "../../config.json";

import ListAnimalRace from "../../Assets/race.json";

function uploadImage(file, res) {
    const formData = new FormData();
    const request = new XMLHttpRequest();
    request.open("POST", config.API_URL + '/pets/image/upload')
    formData.append('petPicture', file);
    formData.append('petID', res.id);
    request.send(formData)

}

function CreatePet() {
    const [animalRace, setAnimalRace] = useState("");
    const [animalRaceProposition, setAnimalRaceProposition] = useState([]);
    const [animalType, setAnimalType] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        /*
            Reset de la race de l'animal et des propositions lors du changement de type de l'animal
        */
        setAnimalRace("");
        setAnimalRaceProposition([]);
    }, [animalType]);

    function ChangeToCamelcase(e) {
        let returnString = "";
        for (let i = 0; i < e.target.value.length; i++) {
            if (e.target.value[i - 1] === " ") {
                returnString += e.target.value[i].toUpperCase();
            } else if (i === 0) {
                returnString += e.target.value[i].toUpperCase();
            } else {
                returnString += e.target.value[i];
            }
        }
        setAnimalRace(returnString);
    }

    useEffect(() => {
        /*
            Si le type de l'animal est renseigné, on récupère les races de cette animal et on les place dans la
            variable d'état animalRaceProposition en regardant si la valeur entré correspond à une des races avec un regex
        */
        var reg = new RegExp(animalRace);
        try {
            const tempList = ListAnimalRace[animalType].filter((item) => {
                return reg.test(item)
            });
            if (tempList[0] !== animalRace && animalRace !== "" && tempList[0][0] === animalRace[0]) {
                setAnimalRaceProposition(tempList[0]);
            } else {
                setAnimalRaceProposition([])
            }
        } catch {
            setAnimalRaceProposition([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animalRace]);


    function sendFormPet(event) {
        const user = JSON.parse(localStorage.getItem("user"));
        fetch(config.API_URL + "/pets", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'accessToken': localStorage.getItem("accessToken")
            },
            body: (
                JSON.stringify({
                        Name: event['name'],
                        Type: event['type'],
                        Race: event['race'],
                        Age: event['age'],
                        Weight: event['weight'],
                        Height: event['height'],
                        Behaviour: event['behaviour'],
                        Sex: event['sex'],
                        Comment: event['comment'],
                        UserId: user.id
                    }
                )
            ),
        }).then(val => val.json())
            .then(res => {
                const file = document.getElementById('petPicture').files[0];
                if (file) {
                    uploadImage(file, res);
                }
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <div className={"CreatePet"}>
            <CustomNavbar
                textLinkOne="Propositions"
                linkOne="/propositions"
                textLinkTwo="Annonces"
                linkTwo="/annonces"
                color="rgba(47, 72, 88, 1)"
            />
            <Container>
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
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            data-testid="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.name && touched.name}
                                            isInvalid={errors.name && touched.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Caractère</Form.Label>
                                        <Form.Select name="behaviour"
                                                     data-testid="behaviour"
                                                     value={values.behaviour}
                                                     onChange={handleChange}
                                                     onBlur={handleBlur}
                                                     isValid={!errors.behaviour && touched.behavior}
                                                     isInvalid={touched.behavior && errors.behaviour}>
                                            <option value="no-value">Sélectionner un caractère</option>
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
                                                     data-testid="type"
                                                     value={values.type}
                                                     onChange={handleChange}
                                                     onBlur={handleBlur}
                                                     onInput={e => setAnimalType(e.target.value)}
                                                     isValid={!errors.type && touched.type}
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
                                        <div className="race-form-container">
                                            <Form.Control
                                                type="text"
                                                name="race"
                                                data-testid="race"
                                                disabled={values.type === '' || values.type === 'NAC' || values.type === 'Poisson' || values.type === 'no-value'}
                                                value={animalRace}
                                                autoComplete="off"
                                                onChange={e => ChangeToCamelcase(e)}
                                                onBlur={handleBlur}
                                                isValid={!errors.race && touched.race}
                                                isInvalid={touched.race && errors.race}
                                            />
                                            <div className="animal-proposition">
                                                {animalRaceProposition}
                                            </div>
                                            <div className="animal-race">
                                                {animalRace}
                                            </div>
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
                                            data-testid="age"
                                            value={values.age}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.age && touched.age}
                                            isInvalid={touched.age && errors.age}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.age}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Sexe</Form.Label>
                                        <Form.Select name="sex"
                                                     data-testid="sex"
                                                     value={values.sex}
                                                     onChange={handleChange}
                                                     onBlur={handleBlur}
                                                     isValid={!errors.sex && touched.sex}
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
                                            data-testid="weight"
                                            value={values.weight}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={!errors.weight && touched.weight}
                                            isInvalid={touched.weight && errors.weight}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.weight}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Taille</Form.Label>
                                        <Form.Select name="height"
                                                     data-testid="height"
                                                     value={values.height}
                                                     onChange={handleChange}
                                                     onBlur={handleBlur}
                                                     isValid={!errors.height && touched.height}
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
                                        <Form.Control onChange={handleChange} data-testid="comment" name="comment"
                                                      as="textarea" rows={3}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Photos</Form.Label>
                                        <Form.Control name="image" type="file" id="petPicture"
                                                      accept="image/png, image/jpeg"/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col className={"div-button"}>
                                        <Button className='submit-button' type="submit" accept="image/*"
                                                data-testid="submit"
                                                multiple>Enregistrer</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    )
}


export default CreatePet;