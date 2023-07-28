import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Product from './menuScreens/Product';
import Guide from './menuScreens/Guide';

import SignUp from './menuScreens/SignUp';
import Registration from './loginEtcMenu/Registration';
import FindID from './loginEtcMenu/FindID';
import FindPW from './loginEtcMenu/FindPW';
import ChangePW from './loginEtcMenu/ChangePW';


import LoginHome from './LoginMenuScreen/LoginHome';
import MyStory from './LoginMenuScreen/MyStory';
import CreateStory from './LoginMenuScreen/CreateStroy';

import Upload from './LoginMenuScreen/Upload';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<App />}>
     <Route path='/Product' element={<Product/>} />
     <Route path='/Guide' element={<Guide/>} />
      </Route> 
      
      <Route path='/Upload' element={<Upload/>} />
      <Route path='/LoginHome' element={<LoginHome/>} />
      <Route path='/MyStroy' element={<MyStory/>} />
     <Route path='/CreateStory' element={<CreateStory/>} />   
      <Route path='/ChangePW' element={<ChangePW/>} />
     <Route path='/SignUp' element={<SignUp/>} />
     <Route path='/Registration' element={<Registration/>} />
     <Route path='/FindID' element={<FindID/>} />
     <Route path='/FindPW' element={<FindPW/>} />
    </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

