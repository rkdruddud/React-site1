import React,{useEffect, useState} from "react";
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import Home from "../menuScreens/Home";
import {GiHamburgerMenu} from 'react-icons/gi';

import {AiOutlineClose} from 'react-icons/ai';
import {GiBowlSpiral} from 'react-icons/gi';
import "../menuScreens/LoginMain.css";
import axios from "axios";


const LoginMain = () => {
  
    const [clickIcon, setClickicon] = useState(false);  
    const [click , setClick] = useState(false);

    const [userID, setUserID] = useState('');

const navigate = useNavigate();
const location = useLocation();

const userIDInfo = {...location.state};

useEffect(()=>{
    setUserID(userIDInfo.userID);
},[]);

const handleClick = () => {
    setClick(!click);
    setClickicon(!clickIcon);
    
}

const closeMobileMenu = () => {
    setClick(false);
    setClickicon(false);
}

const logoutHandle = () =>{
    closeMobileMenu();

    axios.post('http://localhost:8080/LogOut',{
        id : userID
    });

    navigate('/');

}

   return (
    <>
    <nav className="navbar">
      <div className="navbar-containar">
          <div className="navbar-logo">
              
              <GiBowlSpiral className="navbar-logo-icon"></GiBowlSpiral> MyStroy
          </div>
          <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fa-times" : "fa-bars"} />  
               { clickIcon ? (<AiOutlineClose className="menu-close"></AiOutlineClose>) :
               ( <GiHamburgerMenu className="menu-open"></GiHamburgerMenu>)
               }      
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                  <div className="nav-links" onClick={closeMobileMenu}>
                      Home
                  </div>
              </li>
              <li className="nav-item">
                  <div className="nav-links" onClick={closeMobileMenu}>
                      Product
                  </div>
              </li>
              <li className="nav-item">
                  <div className="nav-links" onClick={closeMobileMenu}>
                      Guide
                  </div>
              </li>
          
              <li className="nav-item">
              <div className="nav-links-mobile" onClick={logoutHandle}>
                        로그아웃
                  </div>        
              </li>
          </ul>
  
          
      </div>
    </nav>
         

               <div className="text"> 김지훈 바보</div>


    </>
    )
}
export default LoginMain;