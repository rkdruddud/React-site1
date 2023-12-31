import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import App from './App';

import SignUp from './menuScreens/SignUp';
import Registration from './loginEtcMenu/Registration';
import FindID from './loginEtcMenu/FindID';
import FindPW from './loginEtcMenu/FindPW';
import ChangePW from './loginEtcMenu/ChangePW';


import LoginHome from './LoginMenuScreen/LoginHome';
import MyStory from './LoginMenuScreen/MyStory';
import CreateStory from './LoginMenuScreen/CreateStory';

import Upload from './LoginMenuScreen/Upload';
import AlbumIMG from './LoginMenuScreen/AlbumIMG';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<App />}>
      </Route> 
      
      <Route path='/AlbumIMG' element={<AlbumIMG/>} />
      <Route path='/Upload' element={<Upload/>} />
      <Route path='/LoginHome' element={<LoginHome/>} />
      <Route path='/MyStory' element={<MyStory/>} />
     <Route path='/CreateStory' element={<CreateStory/>} />   
      <Route path='/ChangePW' element={<ChangePW/>} />
     <Route path='/SignUp' element={<SignUp/>} />
     <Route path='/Registration' element={<Registration/>} />
     <Route path='/FindID' element={<FindID/>} />
     <Route path='/FindPW' element={<FindPW/>} />
    </Routes>

    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

