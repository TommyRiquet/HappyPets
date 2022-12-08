/*Importing Styles*/
import './Policy.css';

/* Importing Components*/
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import {Container} from "react-bootstrap";
import PrivacyPolicy from '../../Components/PrivacyPolicy/PrivacyPolicy';


function Policy() {
return ( 
<div className="Policy">
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                color="rgba(47, 72, 88, 1)"
                position="absolute"
            />
            <Container className='top-container'>
                <h2>Mentions légales</h2>
            </Container>

            <Container className='policy-container'>
                <PrivacyPolicy className='policy'/>
            </Container>

        </div>
    );
}


export default Policy;