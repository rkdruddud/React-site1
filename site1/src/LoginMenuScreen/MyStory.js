import React,{useEffect,useState} from "react";
import '../LoginMenuScreen/MyStroy.css';
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import LoginMain from "./LoginMain";
import Skynight from "../images/skynight3.jpg";
import ImgSlide1 from "../images/slide1.jpg";
import ImgSlide2 from "../images/slide2.jpg";
import ImgSlide3 from "../images/slide3.jpg";

import "../Font/Font.css";



const MyStory = ()=>{

   
    const [userID, setUserID] = useState('');
   
    const location = useLocation();

const userIDInfo = {...location.state};
    useEffect(()=>{
        setUserID(userIDInfo.userID);
     
    },[]);

    const scrollMovedown = () =>{
        const element = document.getElementById('content2');
        if(element){
            element.scrollIntoView({behavior:'smooth'});
        }
    }

    const scrollMoveUp = () =>{
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const [position, setPosition] = useState(0);
    const onScroll = () => {
        console.log(window.scrollY);
        setPosition(window.scrollY);  
      }
    
      useEffect(()=>{
    
        window.addEventListener("scroll", onScroll);
    
        return ()=>{
          window.removeEventListener("scroll",onScroll);
        };
      },[]);


    return (
        <>
        <LoginMain></LoginMain>

        <div uploadWrap id="content1">
            <img className="skyImg" src={Skynight}></img>
            <div className="text"> Create your Stroy</div>
            <div className="slideWrap">
            <div className="imgSlide">
                <span><img src={ImgSlide1} className="imgSlide1"></img></span>
                <span><img src={ImgSlide2} className="imgSlide2"></img></span>
                <span><img src={ImgSlide3} className="imgSlide3"></img></span>
                
            </div>

            </div>
            
        <div className="uploadBox"> 업로드 </div>
        <div className="downicon" onClick={scrollMovedown} style={{opacity:(190-position)/50}}>
            ↓
            </div>
        </div>

        <div className="secondWrap" id = "content2">
        <div className="upicon" onClick={scrollMoveUp} style={{opacity:(position-900)/50}}>
        ↑
            </div>
            <div className="shadowblock">

            </div>
           
            <div className="galleryWrap">

            </div>


        </div>
          
        </>
    )
}

export default MyStory;
