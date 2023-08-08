import React, {useState} from "react";
import {Routes, Route, Link} from "react-router-dom";
import Home from "../menuScreens/Home";
import SignUp from "../menuScreens/SignUp";
import {GiHamburgerMenu} from 'react-icons/gi';

import {AiOutlineClose} from 'react-icons/ai';
import {GiBowlSpiral} from 'react-icons/gi';
import "../components/Navbar.css";

const Navbar = () => {




    const [clickIcon, setClickicon] = useState(false);  
const [click , setClick] = useState(false);

const handleClick = () => {
    setClick(!click);
    setClickicon(!clickIcon);
    
}

const closeMobileMenu = () => {
    window.history.replaceState(null,null,"./SignUp");
    setClick(false);
    setClickicon(false);
}
    return (
  <>
  <nav className="navbar">
    <div className="navbar-containar">
        <div className="navbar-logo">
            
            
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            <GiBowlSpiral className="navbar-logo-icon"></GiBowlSpiral> MyStory
                </Link>
        </div>
        <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fa-times" : "fa-bars"} />  
             { clickIcon ? (<AiOutlineClose className="menu-close"></AiOutlineClose>) :
             ( <GiHamburgerMenu className="menu-open"></GiHamburgerMenu>)
             }      
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
            
            <li className="nav-item">
            <Link to="/SignUp" className="nav-links-mobile" onClick={closeMobileMenu}>
                    Sign Up
                </Link>        
            </li>
        </ul>

        
    </div>
  </nav>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/SignUp/*" element={<SignUp/>}></Route>
        </Routes>
  </>
)
}

export default Navbar;