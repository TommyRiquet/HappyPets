import { useEffect,useState } from 'react';
import { Button, Row, Table,Col } from 'react-bootstrap';
import './Report.css';
import AnnonceImage from '../../Assets/annonces.png';
import UserImage from '../../Assets/user.png';
import AvisImage from '../../Assets/fillactere.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import config from '../../config.json';

function Report(data){

    const [result,setresult] = useState([{
        'id':0,
        'UserName': "empty",
        "User":{"id":0,"FirstName":"empty"},
        'Type': "empty",
        'createdAt': "10-11-22",
        'updatedAt': "10-11-22",}])
    const [offset, setOffset] = useState(0);
    let limit  = 20;

    function getReport(offset = 0,
        limit = 20){
        if(data.page === 'all'){
            fetch(config.API_URL+'/admin?'+
            'offset='
            +offset+
            '&limit='
            +limit,{ 
                method: 'GET',
                headers: {'Content-type': 'application/json'},
            })
            .then(val => val.json())
            .then(res =>{
                if (offset === 0){
                    setresult(res);
                    return;
                }
                setresult((result) => [...result,...res]);
            })
        }
        else if (data.page === 'alertUser' || data.page === 'alertAnnonce' || data.page === 'alertAvis'){
            fetch(config.API_URL+'/admin/findtype?type='+data.page+
            '&offset='+offset+
            '&limit='+limit,{ 
                method: 'GET',
                headers: {'Content-type': 'application/json'},
            })
            .then(val => val.json())
            .then(res =>{
                if (offset === 0){
                    setresult(res);
                    return;
                }
                setresult((result) => [...result,...res]);
            })
        }
    }
   
    function handleScroll(e) {
        /*
         *   Fonction qui permet de charger les annonces suivantes quand on arrive en bas de la page
         *      @param e : l'évènement scroll
         */
        if (
          window.innerHeight + e.target.documentElement.scrollTop + 1 >=
          e.target.documentElement.scrollHeight
        ) {
          setOffset((offset) => offset + limit);
        }
      }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        getReport();
        return () => {
            setOffset(0);
            window.removeEventListener("scroll", handleScroll);
          };
      
          // eslint-disable-next-line
    },[data])

    useEffect(() => {
        /*
         * Recharge les annonces lorsque l'offset change
         */
        getReport(
          offset,
          limit,
        );
        // eslint-disable-next-line
      }, [offset]);

    const [display,setdisplay] = useState({
        'id':0,
        'UserName': "empty",
        "User":{"id":0,"FirstName":"empty"},
        'Type': "empty",
        'createdAt': "10-11-22",
        'updatedAt': "10-11-22",})

    const ImageReport = {
        'User':UserImage,
        'Annonce':AnnonceImage,
        'Avis':AvisImage
    };

    function TransformImage(word){
        let Image;
        if (word === 'alertAnnonce'){
            Image = ImageReport['Annonce'];
        }
        else if (word === 'alertUser'){
            Image = ImageReport['User']
        }
        else if (word === 'alertAvis'){
            Image = ImageReport['Avis']
        }
        return Image;
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let date;
    return(
            <div className='reportstyle'>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>User</th>
                            <th>Suspect</th>
                            <th>Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {result.map((report,index) => {
                        date = new Date(report.updatedAt)
                        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                        .toISOString()
                        .split("T")[0];
                        return(
                            <tr key={index} onClick={() =>{setdisplay(report);setShow(true)}}>
                                <td>{report.id}</td>
                                <td>{report.UserName}</td>
                                <td>{report.User.FirstName}</td>
                                <td><img src={TransformImage(report.Type)} className='Image' alt={report.Type}/></td>
                                <td>{date}</td>
                            </tr>)                    
                        })
                    }
                    </tbody>
                </Table>
                <div>
                <>
                <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'offcanva'} scroll= {true}
    backdrop= {true}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Resumé</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='slidestyle'>
                            <Row className='formslide'>
                                <Col>Utilisateur appellent </Col>
                                <Col>{display.UserName}</Col>
                            </Row>
                            <Row className='formslide'>
                                <Col>Utilisateur Suspect</Col>
                                <Col>{display.User.FirstName}</Col>
                            </Row>
                            <Row className='formslide'>
                                <Col>Type de report</Col>
                                <Col>{display.Type}</Col>
                            </Row>
                            <Row>
                                <Col className='formslide' colSpan={"2"}>Description</Col>
                            </Row>
                            <Row>
                                <Col colSpan={"2"} >{display.Description}</Col>
                            </Row>
                        </div>
                    <Button className='cancelButton' type="submit">Annuler</Button>
                </Offcanvas.Body>
                </Offcanvas>
                </>
                </div>
            </div>
    )
}

export default Report;