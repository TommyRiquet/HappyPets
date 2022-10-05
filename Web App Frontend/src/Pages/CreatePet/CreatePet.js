/*Importing Components */
import FormPet from "../../Components/FormPet/FormPet";
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";

/*Importing Styles*/
import './CreatePet.css';

function CreatePet(){
    return(
        <div className={"createPet"}>
            <CustomNavbar />
            <FormPet/>
        </div>
    )
}


export default CreatePet;