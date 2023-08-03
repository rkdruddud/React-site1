import React,{useEffect,useState} from "react";
import "../LoginMenuScreen/MyStory.css";
import {Routes, Route, Link, useNavigate, useLocation, Navigate} from "react-router-dom";
import LoginMain from "./LoginMain";
import axios from "axios";


const MyStory = ()=>{
   
    const [userID, setUserID] = useState('');
    
    const [albumExitence, setAlbumExitence] = useState('visibleMessage');

    const location = useLocation();
    const userIDInfo = {...location.state};
    const navigate = useNavigate();


const findIDExitence = async(props) =>{              // 해당 유저의 아이디로 앨범의 유무를 확인
    
    const response = await axios.get("http://localhost:8080/Mystory",{
            params:{
                'id':props
            }
        });
        
        try{

            if(response.data.length === 0){
                
                console.log("메시지 보임");
                setAlbumExitence('visibleMessage');
            }else{
                console.log("메시지 안보임");
                setAlbumExitence('hiddenMessage');
            }
        }catch(e){
            setAlbumExitence('hiddenMessage');
        }
}


    const createAlbumCard = async(props) =>{        // 데이터베이스 정보를 통한 사용자의 앨범 생성
        let listArea = document.getElementById("cardWrap");
                

        const response = await axios.get("http://localhost:8080/Mystory",{
           params:{
            'id':props
           } 
        });

        try{
           
            console.log(response.data.length);
            for(let i=0, compareValue = 0; i<response.data.length; i++){
                     

                {
                    if(i===0){      // 처음 앨범 생성
                        console.log(response.data[i].title);        
                        let new_album = document.createElement("div");
                        let imgURL = "Storage/"+response.data[i].userID+response.data[i].title+response.data[i].fileName;
                        new_album.setAttribute("class","card");

                        new_album.setAttribute("id","card");
                        

                        //console.log(imgURL);
                        
                        new_album.innerHTML= `<img src=${imgURL}></img>
                        <div>제목 : ${response.data[compareValue].title}<br/>생성 날짜 : ${response.data[compareValue].date}</div>`;
                        listArea.appendChild(new_album);
                        
                        const albumcard = document.getElementById("card");      // 동적 생성된 카드의 아이디 할당
                       
                        albumcard.addEventListener("click",()=>{            // 동적 생성된 카드에 클릭 이벤트 등록
                            navigate("/AlbumIMG",{
                                state:{
                                    userID:response.data[i].userID,
                                    title: response.data[i].title
                                }
                            });
                        });
                        //console.log("생성");
                    }else if(response.data[compareValue].title === response.data[i].title){     //첫 앨범과 같으면 continue
                       
                        //console.log("같은것 존재");
                        continue;
                    }else {     // 앞에 앨범과 제목이 다른 앨범이 나타나면 새로 생성
                        
                        compareValue = i;
                        
                        let new_album = document.createElement("div");
                        let imgURL = "Storage/"+response.data[compareValue].userID+response.data[compareValue].title+response.data[compareValue].fileName;
                        
                        new_album.setAttribute("class","card");
                        new_album.setAttribute("id","card"+compareValue);
                        
                        new_album.innerHTML= `<img src=${imgURL}></img>
                        <div>제목 : ${response.data[compareValue].title}<br/>날짜 : ${response.data[compareValue].date}</div>`;
                        listArea.appendChild(new_album);
                        
                        const albumcard2 = document.getElementById("card"+compareValue);
                        console.log("두번째 생성 카드 이벤트");
                        console.log(albumcard2);
                        albumcard2.addEventListener("click",()=>{
                            console.log(compareValue);
                            navigate("/AlbumIMG",{
                                state:{
                                    userID:response.data[compareValue].userID,
                                    title: response.data[compareValue].title
                                }
                            });
                        });
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
                <div className="backgroundText">
                Mystory album
                </div>
                
                <div id="albumList" className="albumList" >
                  <div className="topText">
                        MyStory album into the Web
                  </div>
                  <div id="cardWrap" className="cardWrap">

                  </div>
                    <div className={albumExitence}>
                         Create your album
                         <div>
                            Let's create your album
                         </div>
                        </div> 
                </div>

            </div>

        </div>


        </>
    )
}

export default MyStory;