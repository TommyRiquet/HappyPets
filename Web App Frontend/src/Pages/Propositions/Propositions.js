/* Importing Components */
import { useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import UserCard from "../../Components/UserCard/UserCard";
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';

/* Importing style */
import './Propositions.css';



function Propositions(){
    const [ListPropositions,setListPropositions] = useState([])
    let offset = 0

    useEffect(()=>{
            window.addEventListener("scroll", handleScroll);
            LoadProposition();
    },[])

  
    function LoadProposition(offset = 0){

        fetch('http://localhost:3001/propositions?id=1')
            .then((response) => response.json())
            .then((data) => {
                if(offset === 0){
                    setListPropositions(data)
                    return
                }
                setListPropositions(ListPropositions => [...ListPropositions, ...data])
        });
    }


    function handleScroll(e){

        if(window.innerHeight+e.target.documentElement.scrollTop+1 >= e.target.documentElement.scrollHeight){

            offset += 6 
            LoadProposition(offset)
        }
    }
    return (
        <div className="Propositions">
            <CustomNavbar textLinkOne="Propositions"
                          linkOne="/propositions"
                          textLinkTwo="Annonces"
                          linkTwo="/annonces"
                          color="rgba(47, 72, 88, 1)"
            />
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