import React,{useState, useEffect} from "react";
import "./AlbumIMG.css";
import {useLocation, useNavigate} from "react-router-dom";
import LoginMain from "./LoginMain";
import axios from "axios";

const AlbumIMG = ()=>{
    const [userID, setUserID] = useState('');
    const [title, settitle] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const userIDInfo = {...location.state};

    const createIMG = async(props)=>{       //앨범의 이미지 생성.

        const listArea = document.getElementById("ImgList");

        const response = await axios.get("http://localhost:8080/AlbumIMG",{
            params: {
                'id':props.userID,
                'title': props.title
            }
        });

        try{

                console.log(props.userID);
                console.log(response.data.length);
            for(let i=0; i<response.data.length; i++){
                
                let new_img = document.createElement("div");
                let imgURL = "Storage/"+response.data[i].userID+response.data[i].title+response.data[i].fileName;
                new_img.setAttribute("class","imgcard");
                new_img.setAttribute("id", "imgcard"+{i});

                new_img.innerHTML= `<img src=${imgURL}></img>
                <div> ${response.data[i].fileName}</div>`;
                listArea.appendChild(new_img);
            }

        }catch(e){
            console.log(e);
        }
    }


    useEffect(()=>{
            setUserID(userIDInfo.userID);
            createIMG(userIDInfo);
    },[]);

    return(
        <>
                 <LoginMain value={userIDInfo.userID}></LoginMain>
        <div className="ImgContainer">
            <div className="ImginnerWrap">

            <div className="toolWrap">

</div>      
            <div className="secondinnerWrap">
      
            <div className="ImgListWrap">
            <div className="ImgList" id="ImgList">

            </div>
            </div>
            </div>
            
            </div>

        </div>
        </>
    )
}

export default AlbumIMG;