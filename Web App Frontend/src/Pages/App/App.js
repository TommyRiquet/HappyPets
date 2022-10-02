/*Importing Components */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from "../../Components/Footer/Footer";

/*Importing Styles*/
import './App.css';

/* Importing Pages*/
import Home from "../Home/Home";
import Error from "../Error/Error";

function App() {
  return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="*" element={<Error/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
  );
}

export default App;
