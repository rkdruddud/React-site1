import React,{useEffect,useState} from "react";
import "../LoginMenuScreen/CreateStory.css";
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import LoginMain from "./LoginMain";

const MyStory = ()=>{
   
    const [userID, setUserID] = useState('');


    const location = useLocation();

const userIDInfo = {...location.state};

    useEffect(()=>{
        setUserID(userIDInfo.userID);
    },[]);

    return (
        <>
         <LoginMain></LoginMain>
        
        <div className="StoryContent">
            <div className="albumWrap">
                <div className="albumList">
                    
                </div>

            </div>

        </div>


        </>
    )
}

export default MyStory;