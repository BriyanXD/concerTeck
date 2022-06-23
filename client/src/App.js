import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home.jsx';
import Detail from './components/Detail/Detail.jsx';
import Login from './components/Login/Login';
import RegisterUser from './components/RegisterUser/RegisterUser.jsx';


function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path='/' element= {<Home/>}/>
            <Route path= '/:id' element={<Detail/>}/>
            <Route exact path='/registrar/:usuario' element= {<RegisterUser/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/>  */} 
          </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;