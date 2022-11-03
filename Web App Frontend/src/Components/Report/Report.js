import './Report.css';

function Report(data){
    console.log(data.page)
    let res;
    if(data.page === 'all'){
        res = <p>All</p>;
    }
    else if(data.page === 'alertUser'){
        res = <p>User</p>;
    }
    else if(data.page === 'alertAnnonce'){
        res =<p>Annonce</p>;
    }
    else if(data.page === 'alertAvis'){
        res = <p>Avis</p>;
    }
    return(
        <div>
            {res}
        </div>
    )
}

export default Report;