import React  from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ShortenUrl from "./components/ShortenUrl";
import VerifyMail from "./components/VerifyMail";
import ResendMail from "./components/ResendMail";
import Url from "./components/Url";

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route exact={true} path='/' element={<Home/>}></Route> 
          <Route exact={true} path='/register' element={<Register/>}></Route> 
          <Route exact={true} path='/login' element={<Login/>}> </Route> 
          <Route exact={true} path='/verify-mail' element={<VerifyMail/>}></Route> 
          <Route exact={true} path='/shorten-urls' element={<ShortenUrl/>}></Route> 
          <Route exact={true} path='/url/:id' element={<Url/>}></Route> 
          <Route exact={true} path='/resend-mail' element={<ResendMail/>}></Route>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
