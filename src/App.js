import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './containers/auth/Login';
import Forgotpass from './containers/auth/Forgotpass';
import Newpassword from './containers/auth/Newpassword';
import Signup from './containers/auth/signup';
import Home from './containers/home';
import Card from './components/card';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';

function App() {
  return(

    <BrowserRouter>
        <Routes>
              <Route path= '/' element = {<Home/>} ></Route>
              <Route path= '/Login' element = {<Login />}> </Route>
              <Route path= '/Forgotpass' element = {<Forgotpass />}> </Route>
              <Route path= '/Newpassword' element = {<Newpassword />}> </Route>
              <Route path= '/signup' element = {<Signup />}> </Route>
          
              
        </Routes>
    </BrowserRouter>
  )
}
export default App

