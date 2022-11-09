import { useEffect,useState } from 'react';
import { Table } from 'react-bootstrap';
import './Report.css';
import AnnonceImage from '../../Assets/annonces.png';
import UserImage from '../../Assets/user.png';
import AvisImage from '../../Assets/fillactere.png';

function Report(data){

    const [result,setresult] = useState([])

    function reportdata(){
        if(data.page === 'all'){
            fetch('http://localhost:3001/admin',{ 
                method: 'GET',
                headers: {'Content-type': 'application/json'},
            })
            .then(val => val.json())
            .then(res =>{
                setresult(res);
            })
        }
        else if (data.page === 'alertUser' || data.page === 'alertAnnonce' || data.page === 'alertAvis'){
            fetch('http://localhost:3001/admin/findtype/'+data.page,{ 
                method: 'GET',
                headers: {'Content-type': 'application/json'},
            })
            .then(val => val.json())
            .then(res =>{
                setresult(res);
            })
        }
    }
   
    useEffect(() => {
        reportdata();
    },[data])

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
                            <tr key={index}>
                                <td>{report.id}</td>
                                <td>{report.ClientName}</td>
                                <td>{report.SuspectName}</td>
                                <td><img src={TransformImage(report.Type)} className='Image' alt={report.Type}/></td>
                                <td>{date}</td>
                            </tr>)                    
                        })
                    }
                    </tbody>
                </Table>
            </div>
    )
}

export default Report;