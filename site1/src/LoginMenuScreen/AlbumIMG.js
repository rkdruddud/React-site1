import React,{useState, useEffect} from "react";
import "./AlbumIMG.css";
import {useLocation, useNavigate} from "react-router-dom";
import LoginMain from "./LoginMain";

const AlbumIMG = ()=>{
    const [userID, setUserID] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    return(
        <>
        <LoginMain></LoginMain>
        <div>

        </div>
        </>
    )
}

export default AlbumIMG;