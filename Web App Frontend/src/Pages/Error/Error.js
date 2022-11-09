/*Importing Components*/
import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import { Button, Container } from "react-bootstrap";

/*Importing Images*/
import sadDog from "../../Assets/sad-dog.png";

/*Importing Style*/
import "./Error.css";

function Error() {
  return (
    <div className="Error">
      <CustomNavbar
        textLinkOne="Propositions"
        linkOne="/propositions"
        textLinkTwo="Annonces"
        linkTwo="/annonces"
        color="rgba(47, 72, 88, 1)"
      />
      <Container>
        <h1 className="title">Perdu ?</h1>
        <h4 className="under-title">Page 404</h4>
        <Button className="home-button" href='/'>Accueil</Button>
      </Container>

      <div className="image-container">
        <img src={sadDog} className="dog-picture" alt="Chien Triste" />
      </div>
    </div>
  );
}

export default Error;
