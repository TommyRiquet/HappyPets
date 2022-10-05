import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import './FormPet.css'


const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input  {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};


const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

const MyText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};


function FormPet (){
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
        <>
            <h1>Inscrivez votre animal</h1>
            <Formik
                initialValues= {{
                name: '',
                type: '',
                race: '',
                age: '',
                weight: '',
                height: '',
                character: '',
                comment: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(25, 'Doit faire 25 caractères ou moins')
                        .min(2, 'Doit faire 2 caractères ou plus')
                        .required('Champ obligatoire'),
                    type: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['chat', 'chien', 'lapin','oiseau','poisson','nac'],
                            'Type invalide'
                        ),
                    race: Yup.string()
                        .max(25, 'Doit faire 25 caractères ou moins')
                        .min(3, 'Doit faire 3 caractères ou plus')
                        .required('Champ obligatoire'),
                    age: Yup.number()
                        .min(0, "l'âge ne peut être négatif")
                        .required('Champ obligatoire'),
                    weight: Yup.number()
                        .min(0, "le poid ne peut être négatif")
                        .required('Champ obligatoire'),
                    height: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['grand', 'moyen', 'petit'],
                            'Taille invalide'
                        ),
                    behaviour: Yup.string()
                        .required('Champ obligatoire')
                        .oneOf(
                            ['dominant', 'domine'],
                            'Caractère invalide'
                        ),
                    comment: Yup.string(),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className={"formPet"} onSubmit={sendFormPet}>
                    <div className="row1">
                        <MyTextInput
                            label="Nom"
                            name="name"
                            type="text"
                        />
                    </div>

                    <div className="row1">
                        <MySelect label="Type" name="type" className="row1">
                            <option value="">Sélectionner un type</option>
                            <option value="chat">Chat</option>
                            <option value="chien">Chien</option>
                            <option value="lapin">Lapin</option>
                            <option value="oiseau">Oiseau</option>
                            <option value="poisson">Poisson</option>
                            <option value="nac">NAC</option>
                        </MySelect>
                    </div>

                    <div className="row2">
                        <MyTextInput
                            label="Race"
                            name="race"
                            type="text"
                        />
                    </div>

                    <div className="row3">
                        <MyTextInput
                            label="Age"
                            name="age"
                            type="number"
                        />
                    </div>

                    <div className="row3">
                        <MyTextInput
                            label="Poids"
                            name="weight"
                            type="number"
                        />
                    </div>

                    <div className="row3">
                        <MySelect label="Taille" name="height" className="row-bottom">
                            <option value="">Selectionner une taille</option>
                            <option value="grand">Grand</option>
                            <option value="moyen">Moyen</option>
                            <option value="petit">Petit</option>
                        </MySelect>
                    </div>

                    <div className="row-bottom">
                        <MySelect label="Caractère" name="behaviour" className="row-bottom">
                            <option value="">Selectionner un caractère</option>
                            <option value="dominant">Dominant</option>
                            <option value="domine">Dominé</option>
                        </MySelect>
                    </div>

                    <div className="row-bottom">
                        <MyText
                            className="row-bottom"
                            label="Commentaire"
                            name="comment"
                        />
                    </div>

                    <button type="submit" className="row-bottom">Submit</button>
                </Form>
            </Formik>
        </>
    );
}

export  default FormPet