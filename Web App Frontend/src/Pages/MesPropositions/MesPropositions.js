/* Importing Components */
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserCard from "../../Components/UserCard/UserCard";
import CustomNavbar from '../../Components/CustomNavbar/CustomNavbar';

/* Importing style */
import './MesPropositions.css';

/*Importing Config*/
import config from "../../config.json";


function Propositions() {
    const [ListPropositions, setListPropositions] = useState([])
    const[id, setID] = useState(0)
    let offset = 0

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        setID(JSON.parse(localStorage.getItem("user")).id)

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        LoadProposition(offset,id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])


    function LoadProposition(offset = 0,id = 0) {

        fetch(config.API_URL+'/propositions/me?id='+id)
            .then((response) => response.json())
            .then((data) => {
                if (offset === 0) {
                    setListPropositions(data)
                    return
                }
                setListPropositions(ListMesPropositions => [...ListMesPropositions, ...data])
            });
    }


    function handleScroll(e) {

        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            offset += 10
            LoadProposition(offset)
        }
    }
    return (
        <div className="propositions">
            <CustomNavbar
                textLinkOne="Je propose mon aide"
                linkOne="/ Propositions"
                textLinkTwo="J'ai besoin d'aide"
                linkTwo="/annonces"
                textLinkThree="S'inscrire"
                linkThree="/register"
                textLinkFour="Se connecter"
                linkFour="/login"
                color="rgba(47, 72, 88, 1)"
                position="absolute"
            />
            <Container className='title'>
                <h2> Mes Propositions</h2>
            </Container>
            <Container className='proposition-list'>
                {
                    ListPropositions.length === 0 ?
                        <h2 className="no-result-message">Vous ne vous êtes pas encore proposé :/</h2>
                        :
                        <Row xs={1} sm={1} lg={2} className=" propositions-list-row" >
                            {
                                ListPropositions.map((proposition, index) => {
                                    return (
                                        <Col key={index} onClick={e => console.log(proposition.Type)}>
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