/*Importing Styles*/
import './UserForm.css';

/*Importing Components */
import {Container,Button} from 'react-bootstrap';
import axios from 'axios';

async function handleSubmit(data)
{
    data.preventDefault();
    await axios.post('http://localhost:3001/users',{ 
        FirstName: data.target[1].value, 
        LastName: data.target[2].value,
        Age: data.target[3].value,
        Adresse: data.target[4].value,
        Email: data.target[5].value,
        Phone: data.target[6].value,
        Role: 0,
        Password: data.target[7].value,
        PhotoLink: 0,
        createdAt: '29-09-22',
        updatedAt: '29-08-22'})
        .catch(function (error) {
            console.log(error);
          });

}

function UserForm() {
    return (
        <div className="UserForm">
            <h2>Page d'inscription</h2>
            <Container>
                <form id="User" onSubmit={handleSubmit}>
                    <fieldset>
                    <legend>Inscription</legend>
                        <table className='UserFormStyle'>
                            <tbody>
                            <tr>
                                <td>
                                    <label>Nom*:</label>
                                </td>
                                <td>
                                    <input type={'text'} id={"Nom"} name={"Nom"} placeholder={'Nom'} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Prenom*:</label>
                                </td>
                                <td>
                                    <input type={'text'} name={"Prenom"} placeholder={'Prénom'} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>   
                                    <label>Age:</label>
                                </td>
                                <td>
                                    <input type={'number'} name={"Age"} placeholder={'Age'}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Adresse*:</label>
                                </td>
                                <td>
                                    <input type={'text'} name={"Adresse"} placeholder={'Adresse'} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Adresse Mail*:</label>
                                </td>
                                <td>
                                    <input type={'email'} name={"mail"} placeholder={'Adresse Mail'} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Numéro de téléphone*:</label>
                                </td>
                                <td>
                                    <input type={'tel'} name={"telephone"} placeholder={'04********'} required></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Mot de passe*:</label>
                                </td>
                                <td>
                                    <input type={'password'} name={"pwd"} placeholder={'Mot de passe'} required></input>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <Button className='UserDB' type="submit">Envoyer</Button>
                    </fieldset>
                </form>
            </Container>
        </div>
    );
}

export default UserForm;
