import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <div>
          <Routes>
            <Route exact path='' element= {<Ruta/>}/>
            <Route exact path='' element= {<Ruta/>}/>
            <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/> 
          </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;