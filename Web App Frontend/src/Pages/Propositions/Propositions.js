/* Importing Components */
import { Container, Row, Col} from "react-bootstrap";
import UserCard from "../../Components/UserCard/UserCard";

/* Importing style */
import './Propositions.css';

let ListPropositions = [
    {name: "Kevin", age: 21, lieu: 'Wavre'},
    {name: "Tommy", age: 20, lieu: 'Louvain la Neuve'},
    {name: "Nathan", age: 21, lieu: 'Ottignies'},
    {name: "Raphaël", age: 19, lieu: 'Wavre'},
    {name: "Marina", age: 30, lieu: 'Rixensart'},
    {name: "Quentin", age: 23, lieu: "Braine-l'Alleud"},
    {name: "Kevin", age: 21, lieu: 'Wavre'},
    {name: "Tommy", age: 20, lieu: 'Louvain la Neuve'},
    {name: "Nathan", age: 21, lieu: 'Ottignies'},
    {name: "Raphaël", age: 19, lieu: 'Wavre'},
    {name: "Marina", age: 30, lieu: 'Rixensart'},
    {name: "Quentin", age: 23, lieu: "Braine-l'Alleud"},
    {name: "Kevin", age: 21, lieu: 'Wavre'},
    {name: "Tommy", age: 20, lieu: 'Louvain la Neuve'},
    {name: "Nathan", age: 21, lieu: 'Ottignies'},
    {name: "Raphaël", age: 19, lieu: 'Wavre'},
    {name: "Marina", age: 30, lieu: 'Rixensart'},
    {name: "Quentin", age: 23, lieu: "Braine-l'Alleud"},
]

function Propositions(){
    return (
        <div className="Propositions">
            <Container className='title'>
                <h2>Propositions</h2>
            </Container>
            <Container className='proposition-list'>
                {
                    ListPropositions.length === 0 ?
                        <h2 className="no-result-message">Personne ne s'est encore proposé :/</h2>
                        :
                    <Row xs={1} sm={1} lg={2}>
                        {
                            ListPropositions.map((proposition,index) => {
                                return (
                                    <Col key={index} onClick={e=>console.log(proposition.name)}>
                                        <UserCard proposition={proposition} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                }
            </Container>
        </div>
    )
}

export default Propositions;    