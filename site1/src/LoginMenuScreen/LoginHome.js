import React,{useEffect,useState} from "react";
import "../LoginMenuScreen/LoginHome.css";
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import LoginMain from "./LoginMain";
import backgroundIMG from "../images/eximg.jpg";
import ImageSample1 from "../images/eximg1.jpg";
import ImageSample2 from "../images/image1.jpg";
import ImageSample3 from "../images/image2.jpg";
import ImageSample4 from "../images/image3.jpg";
import ImageSample5 from "../images/image6.jpg";
import ImageSample6 from "../images/image7.jpg";
import ImageSample7 from "../images/image8.jpg";
import ImageSample8 from "../images/image9.jpg";
import ImageSample9 from "../images/image10.jpg";
import ImageSample10 from "../images/image11.jpg";
import ImageSample11 from "../images/image12.jpg";

const LoginHome = ()=>{
    
    const [userID, setUserID] = useState('');

    const location = useLocation();

    const userIDInfo = {...location.state};

    const num= [1,2,3,4,5,6];
// <img className="homeimg"  src={backgroundIMG}></img>
    useEffect(()=>{
        setUserID(userIDInfo.userID);
        
    },[]);
    
    return (
        <>
        <LoginMain></LoginMain>
        <div className="fullContents">
            <div className="innerContents">
           
            <div className="TextContainer">
                <h1 style={{marginLeft:20}}> MyStroy에 오신것을 환영합니다.
                </h1>
                <h2 style={{marginLeft:60}}>나만의 여행 기록을 남기고 공유해봐요.</h2>
            </div>
            <div className="autoSlideWrap">
                <div className="circle">
                    
                </div>
                <div className="Slider">
                    <span><img className="img1" src={ImageSample1}></img></span>
                    <span><img className="img2" src={ImageSample2}></img></span>   
                    <span><img className="img5" src={ImageSample5}></img></span>
                    <span><img className="img6" src={ImageSample6}></img></span>
                    <span><img className="img7" src={ImageSample7}></img></span>
                    <span><img className="img8" src={ImageSample8}></img></span>
                    <span><img className="img9" src={ImageSample9}></img></span>
                    <span><img className="img10" src={ImageSample10}></img></span>
                   
                </div>

            </div>
            </div>
          

        </div>

        </>
    )
}

export default LoginHome;