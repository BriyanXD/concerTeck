<<<<<<< HEAD
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home.jsx';
import RegisterUser from './components/RegisterUser/RegisterUser.jsx';
import RegisterEvent from './components/RegisterEvent/RegisterEvents';
import Detail from './components/Detail/Detail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ProfileUser from './components/ProfileUser/ProfileUser.jsx';
import PanelAdmin from './components/Admin/adminPanel'
import Favorites from './components/Favorites/Favorites';
import TicketVoucher from './components/TicketVoucher/TicketVoucher.jsx';
import CartCheckout from './components/CartCheckout/CartCheckout';
import SuccessOrCancel from './components/SuccessOrCancel/SuccessOrCancel.jsx';
=======
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import RegisterUser from "./components/RegisterUser/RegisterUser.jsx";
import RegisterEvent from "./components/RegisterEvent/RegisterEvents";
import Detail from "./components/Detail/Detail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProfileUser from "./components/ProfileUser/ProfileUser.jsx";
import PanelAdmin from "./components/Admin/adminPanel";
import Favorites from "./components/Favorites/Favorites";
import TicketVoucher from "./components/TicketVoucher/TicketVoucher.jsx";
import Streaming from "./components/Streaming/Streaming.jsx";
>>>>>>> 4dedaf5bee2675c6035fcf20b0db80d3fc88047c

function App() {
  return (
    <BrowserRouter>
      <div>
<<<<<<< HEAD
          <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path= '/:id' element={<Detail/>}/>
            <Route path='/perfil/panelAdmin' element={<PanelAdmin/>}/>
            <Route exact path='/registrar/:usuario' element= {<RegisterUser/>}/>
            <Route exact path='/perfil/:id' element={<ProfileUser/>}/>
            <Route exact path='/ticket/:id' element={<TicketVoucher/>}/>
            {/* <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/>  */} 
            <Route exact path='/events' element={<RegisterEvent/>}/>
            <Route path='/events' element={<RegisterEvent/>}/>
            <Route path='/favs' element={<Favorites/>}/>
            <Route path='*' element={<PageNotFound/>}/>
            <Route path='/pageNotFound' element={<PageNotFound/>}/>
            <Route path='/cart/checkout' element={<CartCheckout/>}/>
            <Route path='/success' element={<SuccessOrCancel/>}/>
          </Routes>
=======
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/perfil/panelAdmin" element={<PanelAdmin />} />
          <Route exact path="/registrar/:usuario" element={<RegisterUser />} />
          <Route exact path="/perfil/:id" element={<ProfileUser />} />
          <Route exact path="/ticket/:id" element={<TicketVoucher />} />
          {/* <Route exact path='' element= {<Ruta/>}/> 
            <Route exact path='' element= {<Ruta/>}/>  */}
          <Route exact path="/streaming/:id/:eventId" element={<Streaming />} />
          <Route exact path="/events" element={<RegisterEvent />} />
          <Route path="/events" element={<RegisterEvent />} />
          <Route path="/favs" element={<Favorites />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
>>>>>>> 4dedaf5bee2675c6035fcf20b0db80d3fc88047c
      </div>
    </BrowserRouter>
  );
}

export default App;
