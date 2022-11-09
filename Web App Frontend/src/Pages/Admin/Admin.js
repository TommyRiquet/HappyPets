import './Admin.css';

import Nav from 'react-bootstrap/Nav';
import Report from '../../Components/Report/Report';
import {useState} from 'react';

function Admin (){
    const [page, setpage] = useState('all');
    function handleSelect(CurrentPage)
    {
        setpage(CurrentPage);
    }

    return (
        <div>
            <div className='tabsStyle'>
                <Nav className='taille' variant="tabs" defaultActiveKey="all" onSelect={handleSelect}>
                    <Nav.Item className='caseStyle'>
                        <Nav.Link eventKey="all">Feed</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='caseStyle'>
                        <Nav.Link eventKey="alertUser">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='caseStyle'>
                        <Nav.Link eventKey="alertAnnonce">Annonces</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='caseStyle'>
                        <Nav.Link eventKey="alertAvis">Avis</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div>
                    <Report page={page}/>
                </div>
            </div>
        </div>
    );
}

export default Admin;