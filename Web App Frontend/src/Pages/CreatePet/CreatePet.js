/*Importing Components */
import FormPet from "../../Components/FormPet/FormPet";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import {Container } from 'react-bootstrap';

/*Importing Styles*/
import './CreatePet.css';

function CreatePet(){
    return(
        <Container>
            <CustomNavbar />
            <FormPet/>
        </Container>
    )
}


export default CreatePet;