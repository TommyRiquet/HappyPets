/*Importing Components */
import { Button } from 'react-bootstrap';

/*Importing Styles*/
import './ReturnButton.css';

function ReturnButton(props) {
  return (
    <div className="ReturnButton">
      <Button variant="" data-testid="button-return-link" href={props.returnLink} className="return-button">
        Retour
      </Button>
    </div>
  );
}


export default ReturnButton;