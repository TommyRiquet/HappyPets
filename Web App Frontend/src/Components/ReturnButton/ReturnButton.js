/*Importing Components */
import { Button } from 'react-bootstrap';

/*Importing Styles*/
import './ReturnButton.css';

function ReturnButton() {

  function goBack(){
    window.history.back()
  }
  
  return (
    <div className="ReturnButton">
      <Button variant="" onClick={e=>goBack()} className="return-button">
        Retour
      </Button>
    </div>
  );
}


export default ReturnButton;