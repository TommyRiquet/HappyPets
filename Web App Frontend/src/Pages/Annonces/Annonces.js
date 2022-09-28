/*Importing Components */
import {Container, Row, Col, Button} from 'react-bootstrap';
import AnimalCard from '../../Components/AnimalCard/AnimalCard';

/*Importing Styles*/
import './Annonces.css';


let ListAnnonces = [
    {name: "Kiwi", age: 10, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin", photolink:""},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"},
    {name: "", age: -2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"},
    {name: "Kevin", age: -1, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"},
    {name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"},
    {name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"},
    {name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"},
    {name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "Quentin", age: 22, race:"Market Maltais", date:"11/07-11/09", master:"Marina"},
    {name: "Kiwi", age: 2, race:"Bichon Maltais", date:"11/07-11/09", master:"Quentin"},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"},
    {name: "Kevin", age: 10, race:"Ptit Con Maltais", date:"11/07-11/09", master:"Tommy"}
]

function Annonces() {
    return (
        <div className="Annonces">
                <Container className='top-container'>
                <h2>Animaux</h2>
                    <Button className='new-annonce-button' href=''>Nouvelle Annonce</Button>
                </Container>
                <Container className='annonces-container'>

                    {
                    ListAnnonces.length === 0 ? 
                        <h2 className='no-result-message'>Aucun Résultat :/</h2> 
                        :
                        <Row xs={1} sm={1} lg={2}>
                            {
                                ListAnnonces.map((annonce,index) => {
                                    return (
                                        <Col key={index} onClick={e=>console.log(annonce.name)}>
                                            <AnimalCard annonce={annonce} />
                                        </Col>
                                        )
                                })
                            }
                        </Row>
                        }
                    
                </Container>

        </div>
    );
}

export default Annonces;
