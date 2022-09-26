import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


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
