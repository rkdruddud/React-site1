import React,{useEffect,useState} from "react";
import "../LoginMenuScreen/ShareStory.css";
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import LoginMain from "./LoginMain";

const ShareStory = ()=>{
   
    const [userID, setUserID] = useState('');


    const location = useLocation();

const userIDInfo = {...location.state};

    useEffect(()=>{
        setUserID(userIDInfo.userID);
    },[]);

    return (
        <>
         <LoginMain></LoginMain>
        </>
    )
}

export default ShareStory;