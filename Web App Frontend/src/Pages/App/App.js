/*Importing Components */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from "../../Components/Footer/Footer";

/*Importing Styles*/
import './App.css';

/* Importing Pages*/
import Home from "../Home/Home";
import Error from "../Error/Error";
import Annonces from "../Annonces/Annonces";
import Login from '../Login/Login';
import Propositions from '../Propositions/Propositions';
import NewAnnonce from "../NewAnnonce/NewAnnonce";
import {Register} from "../Register/Register";
import MesAnnonces from '../MesAnnonces/MesAnnonces';
import Account from '../Account/Account'
import CreatePet from '../CreatePet/CreatePet'
import DetailAnnonce from '../DetailAnnonce/DetailAnnonce';


function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/annonces" element={<Annonces/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/annonces/new" element={<NewAnnonce/>}/>
                  <Route path="/propositions" element={<Propositions/>}/>
                  <Route path="/mesannonces" element={<MesAnnonces/>}/>
                  <Route path="/account" element={<Account/>}/>
                  <Route path="/createAnimal" element={<CreatePet/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/detailannonce/:id' element={<DetailAnnonce/>}/>
                  <Route path="*" element={<Error/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
  );
}

export default App;