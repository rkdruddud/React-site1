import React,{useEffect,useState} from "react";
import "../LoginMenuScreen/MyStory.css";
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import LoginMain from "./LoginMain";
import axios from "axios";


const MyStory = ()=>{
   
    const [userID, setUserID] = useState('');
    const [albumExitence, setAlbumExitence] = useState('visibleMessage');

    const location = useLocation();
    const userIDInfo = {...location.state};

const findIDExitence = async(props) =>{              // 해당 유저의 아이디로 앨범의 유무를 확인
   const response = await axios.get("http://localhost:8080/Mystory",{
            params:{
                'id':props
            }
        });

        try{

            
            if(!response.data[0].id && (await response).data === "none"){
                setAlbumExitence('visibleMessage');
            }else{
                setAlbumExitence('hiddenMessage');
            }
        }catch(e){
            setAlbumExitence('hiddenMessage');
        }
}


    const createAlbumCard = async(props) =>{
        let listArea = document.getElementById("albumList");
        

        const response = await axios.get("http://localhost:8080/Mystory",{
           params:{
            'id':props
           } 
        });

        try{
            
            console.log(response.data.length);
            for(let i=0, compareValue = 0; i<response.data.length; i++){
                     
                
                console.log(response.data[i].fileName);

                {
                    if(i===0){
                        console.log(response.data[i].title);        
                        let new_album = document.createElement("div");
                        new_album.setAttribute("class","card");
                   
                        new_album.innerHTML= `<img src=${require("../server/Storage/ruddudqweKakaoTalk_20220930_170052719_01.jpg").default}></img>
                        <div>제목 : ${response.data[compareValue].title}<br/>생성 날짜 : ${response.data[compareValue].date}</div>`;
                        
                        
                        
                        listArea.appendChild(new_album);
                        console.log("생성");
                    }else if(response.data[compareValue].title === response.data[i].title){
                       
                        console.log("같은것 존재");
                        continue;
                    }else {
                        
                        compareValue = i;
                        console.log(response.data[compareValue].title);
                        let new_album = document.createElement("div");
                        new_album.setAttribute("class","card");
                        new_album.innerHTML= `<img src=${require("../server/Storage/ruddudqweKakaoTalk_20220930_170052719_01.jpg").default}></img>
                        <div>제목 : ${response.data[compareValue].title}<br/>날짜 : ${response.data[compareValue].date}</div>`;
                        listArea.appendChild(new_album);
                        
                    }
                        
                    
                }
            }

        }catch(e){
            console.log(e);
        }

    }

    useEffect(()=>{
        setUserID(userIDInfo.userID);
        findIDExitence(userIDInfo.userID);
        console.log("유스이펙트 실행");
        createAlbumCard(userIDInfo.userID);
        
    },[]);

    return (
        <>
         <LoginMain value={userID}></LoginMain>
        
        <div className="StoryContent">
            <div className="albumWrap">
                <div id="albumList" className="albumList" >
                   
                    <div className={albumExitence}>
                         아직 올라온게 없어요..
                        </div> 
                </div>

            </div>

        </div>


        </>
    )
}

export default MyStory;