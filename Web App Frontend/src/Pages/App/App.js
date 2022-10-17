/*Importing Components */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from "../../Components/Footer/Footer";
import {useEffect, useState} from "react";
import Axios from "axios";

/*Importing Styles*/
import './App.css';

/* Importing Pages*/
import Home from "../Home/Home";
import Error from "../Error/Error";
import Annonces from "../Annonces/Annonces";
import Login from '../Login/Login';
import Propositions from '../Propositions/Propositions';
import CreatePet from "../CreatePet/CreatePet";
import NewAnnonce from "../NewAnnonce/NewAnnonce";
import {UserForm} from "../UserForm/UserForm";
import MesAnnonces from '../MesAnnonces/MesAnnonces';

const [loginStatus, setLoginStatus] = useState(false);

function App() {
    Axios.defaults.withCredentials = true

    useEffect(() => {
        Axios.get(`http://localhost:3001/users/login`).then(res => {
            if (res.data.auth) {
                setLoginStatus(true)
            }
        })
    }, [])
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/annonces" element={<Annonces/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/creationAnimal" element={<CreatePet/>}/>
                  <Route path="/annonces/new" element={<NewAnnonce/>}/>
                  <Route path="/propositions" element={<Propositions/>}/>
                  <Route path="/mesannonces" element={<MesAnnonces/>}/>

                  <Route path='/inscription' element={<UserForm/>}/>
                  <Route path="*" element={<Error/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
  );
}

export default App;