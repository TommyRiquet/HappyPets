/*Importing Components*/
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import { Button, Container } from "react-bootstrap";
import Footer from '../../Components/Footer/Footer';

/*Importing Images*/
import sadDog from "../../Assets/sad-dog.png";

/*Importing Style*/
import "./Error.css";

function Error() {
  return (
    <div className="Error">
      <CustomNavbar
        textLinkOne="Je propose mon aide"
        linkOne="/propositions"
        textLinkTwo="J'ai besoin d'aide"
        linkTwo="/annonces"
        textLinkThree="S'inscrire"
        linkThree="/register"
        textLinkFour="Se connecter"
        linkFour="/login"
        color="rgba(47, 72, 88, 1)"
        position="absolute"
      />
      <Container>
        <h1 className="title">Perdu ?</h1>
        <h4 className="under-title">Page 404</h4>
        <Button className="home-button" href='/'>Accueil</Button>
      </Container>

      <div className="image-container">
        <img src={sadDog} className="dog-picture" alt="Chien Triste" />
      </div>
      <Footer/>
    </div>
  );
}

export default Error;
