import React,{useEffect,useState} from "react";
import '../LoginMenuScreen/CreateStory.css';
import {useNavigate, useLocation} from "react-router-dom";
import LoginMain from "./LoginMain";
import Skynight from "../images/skynight3.jpg";
import ImgSlide1 from "../images/slide1.jpg";
import ImgSlide2 from "../images/slide2.jpg";
import ImgSlide3 from "../images/slide3.jpg";

import "../Font/Font.css";



const CreateStory = ()=>{

   
    const [userID, setUserID] = useState('');
   
    const location = useLocation();

    const navigate = useNavigate();

const userIDInfo = {...location.state};
    useEffect(()=>{
        
        setUserID(userIDInfo.userID);
     
    },[]);

    return (
        <>
        <LoginMain value={userID}></LoginMain>

        <div className="uploadWrap"  id="content1">
            <img className="skyImg" src={Skynight}></img>
            <div className="text"> Create your Story</div>
            <div className="slideWrap">
            <div className="imgSlide">
                <span><img src={ImgSlide1} className="imgSlide1"></img></span>
                <span><img src={ImgSlide2} className="imgSlide2"></img></span>
                <span><img src={ImgSlide3} className="imgSlide3"></img></span>
                
            </div>

            </div>
            
        <div className="uploadBox"  onClick={()=>{
            navigate("/Upload",{
                state: {
                    userID : `${userID}`
                }
            });
        }}> 앨범 생성 </div>
         </div>          
        </>
    )
}

export default CreateStory;
