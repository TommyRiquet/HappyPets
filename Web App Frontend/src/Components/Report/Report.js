import { useEffect, useState } from 'react';
import './Report.css';

function Report(data){

    const [result,setresult] = useState('')
    
    if(data.page === 'all'){
        fetch('http://localhost:3001/admin',{ 
                    method: 'GET',
                    headers: {'Content-type': 'application/json'},
        })
        .then(val => val.json())
        .then(res =>{
            setresult(res.map((id,ClientName) => {
                return (id,ClientName )
            }
            ));
            })
    }
    else if(data.page === 'alertUser'){
        result = <p>User</p>;
    }
    else if(data.page === 'alertAnnonce'){
        result =<p>Annonce</p>;
    }
    else if(data.page === 'alertAvis'){
        result = <p>Avis</p>;
    }
    return(
        <div>
            {result}
        </div>
    )
}

export default Report;