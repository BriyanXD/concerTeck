import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home.jsx';


function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path='/' element= {<Home/>}/>
            {/* <Route exact path='' element= {<Ruta/>}/>
            <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/>  */}
          </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;