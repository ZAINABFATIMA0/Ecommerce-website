import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Login from './containers/auth/Login';
import Forgotpass from './containers/auth/Forgotpass';
import Newpassword from './containers/auth/Newpassword';
import Signup from './containers/auth/signup';
import Home from './containers/home';
import Order from './containers/Order';
import Cart from './containers/Cart';
import Dashboard from './containers/admin/dashboard';
import OrderDetails from './containers/orderDetails';
import Order1 from './containers/admin/order';



function App() {
  return(

    <BrowserRouter>
        <Routes>
              <Route path= '/' element = {<Home/>} ></Route>
              <Route path= '/Login' element = {<Login />}> </Route>
              <Route path= '/Forgotpass' element = {<Forgotpass />}> </Route>
              <Route path= '/Newpassword' element = {<Newpassword />}> </Route>
              <Route path= '/signup' element = {<Signup />}> </Route>
              <Route path= '/cart' element = {<Cart/>}> </Route>
              <Route path= '/Order' element = {<Order/>}> </Route>
              <Route path= '/Admin' element = {<Dashboard/>}> </Route>
              <Route path= '/OrderDetails/:orderId' element = {<OrderDetails/>}> </Route>
              <Route path= '/order' element = {<Order1/>}> </Route>
             
          
              
        </Routes>
    </BrowserRouter>
  )
}
export default App

