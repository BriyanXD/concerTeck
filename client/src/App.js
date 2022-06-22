import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home.jsx';
import RegisterUser from './components/RegisterUser/RegisterUser';
import Detail from './components/Detail/Detail';


function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path='/' element= {<Home/>}/>
            <Route path= '/:id' element={<Detail/>}/>
            {/* <Route exact path='/register' element= {<RegisterUser/>}/> */}
            {/* <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/>  */} 
          </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;