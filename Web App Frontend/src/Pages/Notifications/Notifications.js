/*Importing Components*/
import { Container, Nav, Col, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';

import CustomNavbar from "../../Components/CustomNavbar/CustomNavbar";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";

/*Importing Config*/
import config from "../../config.json";


function Notifications() {
  const [activeTab, setActiveTab] = useState('annonces')
  const [displayList, setDisplayList] = useState([])
  const [notificationToDelete, setNotificationToDelete] = useState([0,0])

  useEffect(() => {
    
    /*
    * Réception des notifications
    */

    let user = JSON.parse(localStorage.getItem('user')) || {Pets: []}

    fetch(config.API_URL+'/notifications/'+activeTab+'?userid='+user.id)
    .then((response) => response.json())
    .then((data) => {
      setDisplayList(data)
});
  }, [activeTab]);


  useEffect(()=>{
    /*
    * Suppression d'une notification sur la page
    */
    setDisplayList(displayList.filter((_,index)=> index !== notificationToDelete[2]))

    /*
    * Suppression de la notification dans la base de données
    */
    fetch(config.API_URL+'/notifications/'+activeTab+"?id="+notificationToDelete[0]+'&userid='+notificationToDelete[1], {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
},[notificationToDelete])


    return (
        <div className="notifications">
          <CustomNavbar
            textLinkOne="Je propose mon aide"
            linkOne="/propositions"
            textLinkTwo="J'ai besoin d'aide"
            linkTwo="/annonces"
            color="rgba(47, 72, 88, 1)"
          />
          <Container className="content-container">
            <Nav
              activeKey="demandes"
              onSelect={(selectedKey) => setActiveTab(selectedKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey={"annonces"}>Demandes d'aides</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"propositions"}>Propositions d'aides</Nav.Link>
              </Nav.Item>
            </Nav>
            <Container className="notifications-container">
              {activeTab === "annonces" ? (
                <>
                  <h3>Les personnes intérressées par mes annonces</h3>
                </>
              ) : (
                <>
                  <h3>Les personnes intérressées par mes propositions</h3>
                </>
              )}
                <Container className='notification-list'>
                {
                    displayList.length === 0 ?
                        <h2 className="no-result-message">Aucune notification :/</h2>
                        :
                        <Row xs={1} xl={2} className="notification-list-row" >
                            {
                                displayList.map((notification, index) => {
                                    return (
                                        <Col key={index}>
                                            <NotificationCard resetShowEmail={displayList} deleteSelf={setNotificationToDelete} 
                                            type={activeTab} index={index} notification={notification}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                }
              </Container>
            </Container>
          </Container>
        </div>
    )
}

export default Notifications;
