/*Importing Components */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from "../../Components/Footer/Footer";

/*Importing Styles*/
import './App.css';

/* Importing Pages*/
import Home from "../Home/Home";
import Error from "../Error/Error";
import Annonces from "../Annonces/Annonces";
import Propositions from '../Propositions/Propositions';
import NewAnnonce from "../NewAnnonce/NewAnnonce";


function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/annonces" element={<Annonces/>}/>
                  <Route path="/annonces/new" element={<NewAnnonce/>}/>
                  <Route path="/propositions" element={<Propositions/>}/>
                  <Route path="*" element={<Error/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
  );
}

export default App;