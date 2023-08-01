import React,{useEffect, useState} from "react";
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import Home from "../menuScreens/Home";
import {GiHamburgerMenu} from 'react-icons/gi';

import {AiOutlineClose} from 'react-icons/ai';
import {GiBowlSpiral} from 'react-icons/gi';
import "../LoginMenuScreen/LoginMain.css";
import axios from "axios";

import CreateStory from './CreateStory';
import MyStory from './MyStory';
import LoginHome from '../LoginMenuScreen/LoginHome';

const LoginMain = (props) => {
  
    const [clickIcon, setClickicon] = useState(false);  
    const [click , setClick] = useState(false);

    const [userID, setUserID] = useState('');

const navigate = useNavigate();
const location = useLocation();

const userIDInfo = {...location.state};

const navigte = useNavigate();


useEffect(()=>{
    
    if(!props.value){
       if(!userIDInfo.userID){
            console.log("아이디 값이 없음.");
       }else{
        setUserID(userIDInfo.userID);
        console.log(userIDInfo.userID);
       }

    }else {
     
    setUserID(props.value);
    console.log(props.value);   
    }
},[props]);



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


const loadMyStory = ()=>{
    closeMobileMenu();
    navigate('/MyStory',{
        state: {
            userID : `${userID}`
        }
    });
}

const loadCreateStory = ()=>{
    closeMobileMenu();
    console.log(userID);
    navigate('/CreateStory',{
        state: {
            userID : `${userID}`
        }
    });
}


   return (
    <>
    <nav className="navbar2">
      <div className="navbar-containar2">
          <div className="navbar-logo2">
              
              <GiBowlSpiral className="navbar-logo-icon2"></GiBowlSpiral> MyStory
          </div>
          <div className="menu-icon2" onClick={handleClick}>
              <i className={click ? "fa-times2" : "fa-bars2"} />  
               { clickIcon ? (<AiOutlineClose className="menu-close2"></AiOutlineClose>) :
               ( <GiHamburgerMenu className="menu-open2"></GiHamburgerMenu>)
               }      
          </div>
          <ul className={click ? "nav-menu active2" : "nav-menu2"}>
              <li className="nav-item2">
                  <Link to="/LoginHome" state={ {id:userID} } className="nav-links2" onClick={closeMobileMenu}>
                     Home
                  </Link>
              </li>
              <li className="nav-item2">
                  <div  className="nav-links2" onClick={loadMyStory}>
                      MyStory
                  </div>
              </li>
              <li className="nav-item2">
                  <div className="nav-links2" onClick={loadCreateStory}>
                  CreateStory
                  </div>
              </li>
          
              <li className="nav-item2">
              <div className="nav-links-mobile2" onClick={logoutHandle}>
                        Sign out
                  </div>        
              </li>
          </ul>
  
          
      </div>
    </nav>

    <Routes>
            <Route path="/LoginHome" element={<LoginHome/>}></Route>
        </Routes>

            

    </>
    )
}
export default LoginMain;