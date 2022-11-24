/*Importing Styles*/
import './Register.css';

/*Importing Config*/
import config from "../../config.json";

/*Importing Components */
import {Container, Button, Form, Row, Col} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';
import {sub} from "date-fns/fp"
import {useNavigate} from 'react-router';
import {Formik} from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password'
import { sha256 } from 'js-sha256';

YupPassword(yup)


function Register() {

    let navigate = useNavigate();

    const [emailVerif, setemailVerif] = useState('');
    const [Resemail, setResemail] = useState('');

    const schema = yup.object().shape({
        LastName: yup.string().matches(/^[a-zA-Z]*$/, 'Symboles et chiffres interdits').required('Champ obligatoire'),
        FirstName: yup.string().matches(/^[a-zA-Z]*$/, 'Symboles et chiffres interdits').required('Champ obligatoire'),
        Age: yup.date().max(sub({years: 18}, new Date()), "Il faut être âgé de 18 ans minimum").required('Champ obligatoire'),
        City: yup.string().matches(/^[a-zA-Z]*$/, 'Symboles et chiffres interdits').required('Champ obligatoire'),
        Postal: yup.number().min(1000, 'Code postal incorrect').test('len', 'Numero incorrect', (val) => {
            if (val) return val.toString().length === 4;
        }).required('Champ obligatoire'),
        Email: yup.string().email().test('exist', 'Email déjà utilisé ou champ vide', (val) => {
            if (val !== undefined) {
                setemailVerif(val);
                return Resemail;
            }
        }).required('Champ obligatoire'),
        Phone: yup.number().test('len', 'Numero incorrect', (val) => {
            if (val) return val.toString().length === 9;
        }).required('Champ obligatoire'),
        Password: yup.string().min(8, '8 Charactère minimum.').minNumbers(2, 'Le mot de passe doit contenir 2 numéro minimum').required('Champ obligatoire'),
        Password2: yup.string().required("Confirmation de mot de passe est obligatoire").oneOf([yup.ref("Password"), null], "Mot de passe différent"),
        Terms: yup.bool().required('Champ obligatoire').oneOf([true], "Veuillez accepter les conditions d'utilisation"),
    });


    useEffect(() => {
        emailVerif !== "" ?
        fetch(config.API_URL+'/users/checkemail/'+emailVerif,{ 
                    method: 'GET',
                    headers: {'Content-type': 'application/json'},
        })
        .then(val => val.json())
        .then(res =>{
            setResemail(res);
            }
        )
        : 
        setResemail('');
        }, [emailVerif]);
        
    function uploadImage(file,id){
        const formData = new FormData();
        const request = new XMLHttpRequest();
        
        request.open("POST",config.API_URL+'/users/image/upload')
        formData.append('profilePicture', file);
        formData.append('userid', id);
        request.send(formData)

    }

async function SendFormUSer(data){
        const hash =  sha256(data['Password']+"J'aime bien Tommy")
            fetch(config.API_URL+'/users',{ 
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    LastName: data['LastName'], 
                    FirstName: data['FirstName'],
                    Age: data['Age'],
                    City: data['City'],
                    Postal: data['Postal'],
                    Email: data['Email'],
                    Phone: data['Phone'],
                    Role: 0,
                    Password: hash,
                    PhotoLink: null
                })
                
        }).then(val => val.json())
            .then(res => {
                const file = document.getElementById('profilePicture').files[0];
                if (file) {
                    uploadImage(file, res);
                }
                navigate('/login');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="UserForm">
            <CustomNavbar color="rgba(47, 72, 88, 1)"/>
            <Container>
                <h2>Page d'inscription</h2>
                <div>
                    <Formik
                        validationSchema={schema}
                        onSubmit={SendFormUSer}
                        initialValues={{
                            LastName: '',
                            FirstName: '',
                            Age: '',
                            City: '',
                            Postal: '',
                            Email: '',
                            Phone: '',
                            Password: '',
                            Password2: '',
                            Terms: false,
                        }}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              touched,
                              values,
                              errors,
                          }) => (
                            <Form noValidate id="User" onSubmit={handleSubmit} encType="multipart/form-data">
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm="6">
                                        <Form.Label>Nom:</Form.Label>
                                        <Form.Control type={'text'} name={"LastName"} data-testid="testNom"
                                                      placeholder={'Ex: Jean'} value={values.LastName}
                                                      onChange={handleChange} onBlur={handleBlur}
                                                      isValid={!errors.LastName && touched.LastName}
                                                      isInvalid={errors.LastName && touched.LastName} required/>
                                        <Form.Control.Feedback type="invalid">{errors.LastName}</Form.Control.Feedback>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Label>Prénom:</Form.Label>
                                        <Form.Control type={'text'} name={"FirstName"} placeholder={'Ex: Dupuis'}
                                                      value={values.FirstName} onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      isValid={!errors.FirstName && touched.FirstName}
                                                      isInvalid={errors.FirstName && touched.FirstName} required/>
                                        <Form.Control.Feedback type="invalid">{errors.FirstName}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm="8">
                                        <Form.Label>Ville:</Form.Label>
                                        <Form.Control type={'text'} name={"City"} placeholder={'Ex: Wavre'}
                                                      value={values.City} onChange={handleChange} onBlur={handleBlur}
                                                      isValid={!errors.City && touched.City}
                                                      isInvalid={errors.City && touched.City} required/>
                                        <Form.Control.Feedback type="invalid">{errors.City}</Form.Control.Feedback>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Label>Code Postal:</Form.Label>
                                        <Form.Control type={'number'} name={"Postal"} data-testid="testPostal"
                                                      placeholder={'Ex: 1300'} value={values.Postal}
                                                      onChange={handleChange} onBlur={handleBlur}
                                                      isValid={!errors.Postal && touched.Postal}
                                                      isInvalid={errors.Postal && touched.Postal} required/>
                                        <Form.Control.Feedback type="invalid">{errors.Postal}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm="12">
                                        <Form.Label>Adresse Mail:</Form.Label>
                                        <Form.Control type={'email'} name={"Email"}
                                                      placeholder={'Ex: J.dupuis@hotmail.fr'} value={values.Email}
                                                      onChange={handleChange} onBlur={handleBlur}
                                                      isValid={!errors.Email && touched.Email}
                                                      isInvalid={errors.Email && touched.Email} required/>
                                        <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm="7">
                                        <Form.Label>Numéro de téléphone:</Form.Label>
                                        <Form.Control type={'number'} name={"Phone"} placeholder={'Ex: 04********'}
                                                      value={values.Phone} onChange={handleChange} onBlur={handleBlur}
                                                      isValid={!errors.Phone && touched.Phone}
                                                      isInvalid={errors.Phone && touched.Phone} required/>
                                        <Form.Control.Feedback type="invalid">{errors.Phone}</Form.Control.Feedback>
                                    </Col>
                                    <Col sm="5">
                                        <Form.Label>Date de naissance:</Form.Label>
                                        <Form.Control type={'date'} name={"Age"} onChange={handleChange}
                                                      onBlur={handleBlur} isValid={!errors.Age && touched.Age}
                                                      isInvalid={errors.Age && touched.Age}/>
                                        <Form.Control.Feedback type="invalid">{errors.Age}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm="12">
                                        <Form.Label>Mot de passe:</Form.Label>
                                        <Form.Control type={'password'} name={"Password"} placeholder={'Mot de passe'}
                                                      value={values.Password} onChange={handleChange}
                                                      onBlur={handleBlur} isValid={!errors.Password && touched.Password}
                                                      isInvalid={errors.Password && touched.Password} required/>
                                        <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-4">
                                    <Col sm="12">
                                        <Form.Label>Confirmer le mot de passe:</Form.Label>
                                        <Form.Control type={'password'} name={"Password2"}
                                                      placeholder={'Confirmation Mot de passe'} value={values.Password2}
                                                      onChange={handleChange} onBlur={handleBlur}
                                                      isValid={!errors.Password2 && touched.Password2}
                                                      isInvalid={errors.Password2 && touched.Password2} required/>
                                        <Form.Control.Feedback type="invalid">{errors.Password2}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-4">
                                    <Col sm="12">
                                        <Form.Label>Photo de Profil:</Form.Label>
                                        <Form.Control type="file" name="profilePicture" id="profilePicture"/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm="12">
                                        <Form.Check type={'switch'} name={'Terms'}
                                                    label={"J'accepte les conditions d'utilisation."}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    isValid={!errors.Terms && touched.Terms}
                                                    isInvalid={errors.Terms && touched.Terms} feedback={errors.Terms}
                                                    feedbackType="invalid" required/>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Button className='UserDB' type="submit">Envoyer</Button>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    );
}

export {Register};
