/*Importing Components */
import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';

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
import {DetailAnnonce} from '../DetailAnnonce/DetailAnnonce';
import Admin from '../Admin/Admin';
import CreateProposition from '../CreateProposition/CreateProposition';
import { DetailProposition } from '../DetailProposition/DetailProposition';
import Notifications from '../Notifications/Notifications';
import Policy from '../Policy/Policy';


function App() {
  const VerifRoute = ({autorized,redirectPath,children,}) => {
    if (!autorized){
      return <Navigate to={redirectPath} replace/>;
    }

    return children ? children : <Outlet/>;
  }
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/annonces" element={<Annonces/>}/>
                  <Route path="/propositions" element={<Propositions/>}/>
                  <Route path='/detailannonce/:id' element={<DetailAnnonce/>}/>
                  <Route path='/detailproposition/:id' element={<DetailProposition/>}/>
                  <Route path='/policy' element={<Policy/>}/>


                  {/* Routes pour les utilisateurs connectés */}
                  <Route element={<VerifRoute autorized={localStorage.getItem("user")} redirectPath={'/'} />}>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/createAnimal" element={<CreatePet/>}/>
                    <Route path="/annonces/new" element={<NewAnnonce/>}/>
                    <Route path="/mesannonces" element={<MesAnnonces/>}/>
                    <Route path="/createProposition" element={<CreateProposition/>}/>
                    <Route path="/notifications" element={<Notifications/>}/>
                  </Route>

                  {/* Routes bloqués lorsque l'utilisateur est connectés */}
                  <Route element={<VerifRoute autorized={!localStorage.getItem("user")} redirectPath={'/'} />}>
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                  </Route>

                  {/* Routes bloqués si l'utilisateur n'est pas admin et connectés */}
                  <Route element={<VerifRoute autorized={localStorage.getItem("user") !== null && JSON.parse(localStorage.getItem("user")).Role === 1} redirectPath={'/'} />}>
                    <Route path='/admin' element={<Admin/>}/>
                  </Route>

                  {/* Lorsqu'aucune route n'a été trouvé */}
                  <Route path="*" element={<Error/>}/>
              </Routes>
          </BrowserRouter>
  );
}

export default App;