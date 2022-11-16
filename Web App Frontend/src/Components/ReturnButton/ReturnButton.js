/*Importing Components */
import { Button } from 'react-bootstrap';

/*Importing Styles*/
import './ReturnButton.css';

function ReturnButton() {
  return (
    <div className="ReturnButton">
      <Button variant="" onClick={e=>window.history.back()} className="return-button">
        Retour
      </Button>
    </div>
  );
}


export default ReturnButton;