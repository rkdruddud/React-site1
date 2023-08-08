import React,{useState, useEffect} from "react";
import "./AlbumIMG.css";
import {useLocation, useNavigate} from "react-router-dom";
import LoginMain from "./LoginMain";
import axios from "axios";

const AlbumIMG = ()=>{
    const [userID, setUserID] = useState('');
    const [title, settitle] = useState('');
    const [date, setDate] = useState('');

    //const [selectValid, setSelectValid] = useState(false);

    const [visiblebtn, setVisiblebtn] = useState('hiddenvisiblebtn');     // 삭제 버튼 숨기기와 보이기 상태

    const [select, setSelect] = useState(false);    // 선택 했는지 확인하기 위한 상태
    const [checkItem, setCheckItem] = useState(new Set());      // 선택된 이미지들을 저장하기 위함
    
    const [AllSelectID, setAllSelectID] = useState("전체 선택");    //전체선택 or 전체 선택 해제


    
    const location = useLocation();
    const navigate = useNavigate();

    const userIDInfo = {...location.state};


    const onClickAdd = async(e)=>{              // 이미지 추가 버튼 클릭 이벤트

        const formData = new FormData();

        const fileList = e.target.files;

        for(let i=0; i<fileList.length; i++){
            formData.append("file",fileList[i]);
        }

        axios.post("http://localhost:8080/AlbumIMG_1",formData,{
        params:{
                    id:userID,
                    title: title,
                    date:date,
                    fileName:fileList
        }
        });

        window.location.reload();
    }

    const onClickDelete = async()=>{        //삭제 버튼 클릭
        
        checkItem.forEach((element)=>{

        axios.post("http://localhost:8080/AlbumIMG",{
                id:userID,
                title:title,
                fileName:element
            });
        
            axios.delete("http://localhost:8080/AlbumIMG",{
                params:{
                    id:userID,
                    title:title,
                    fileName:element
                }
            });
    
        });

        alert("삭제 완료");
        window.location.reload();
    }


    const onClickDownload = ()=>{

        checkItem.forEach((element)=>{
            const fileURL = "Storage/"+userID+title+element;
            
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = element;
            document.body.appendChild(a);
            a.click();
            
            
        });
    }



    const onClickAllSelect= async(props)=>{        //전체 선택 or 전체 선택 해제 handle
        

        const response = await axios.get("http://localhost:8080/AlbumIMG",{
            params: {
                'id':userID,
                'title':title
            }
        });

        if(AllSelectID === "전체 선택"){
            setAllSelectID("전체 선택 해제");
            
            for(let i=0; i<response.data.length; i++){
                let checkBoxs = document.getElementById("imgchecked"+i);
                if(checkBoxs.checked===false){
                    checkBoxs.checked = true;
                    checkItem.add(response.data[i].fileName);
                }else {
                    checkItem.add(response.data[i].fileName);
                }
                    
            }
            
        }
        else{
            setAllSelectID("전체 선택");
            
            for(let i=0; i<response.data.length; i++){
                let checkBoxs = document.getElementById("imgchecked"+i);
                if(checkBoxs.checked===true){
                    checkBoxs.checked = false;
                    checkItem.delete(response.data[i].fileName);    
                }
                else{
                    checkItem.delete(response.data[i].fileName);    
                }
                
                
                if(checkItem.size===0){
                    setVisiblebtn("hiddenvisiblebtn");
                }
            }
        }
        
    }

    const createIMG = async(props)=>{       //앨범의 이미지 생성.

        const listArea = document.getElementById("ImgList");

        const response = await axios.get("http://localhost:8080/AlbumIMG",{
            params: {
                'id':props.userID,
                'title': props.title
            }
        });

        try{
                setDate(response.data[0].date);
              
            for(let i=0; i<response.data.length; i++){
                
                let new_img = document.createElement("div");
                
                let imgURL = "Storage/"+response.data[i].userID+response.data[i].title+response.data[i].fileName;
                let imgID = "imgcardinner"+i;
                let checkedID = "imgchecked"+i;
                
                let stringFileName = response.data[i].fileName;
                let splitNameLength = stringFileName.split('.').length;
                let word = stringFileName.split('.');

                new_img.setAttribute("class","imgcard");
                new_img.setAttribute("id", "imgcard"+i);
                
              
                if( word[splitNameLength-1]==="mp4"){
                    new_img.innerHTML= `<input type="checkbox" className = "imgSelect" id=${checkedID}></input><video src=${imgURL} id = ${imgID} autoPlay=${false} controls=${true}></video>
                    <div> ${response.data[i].fileName}</div>`;    
                }
                else{
                    new_img.innerHTML= `<input type="checkbox" className = "imgSelect" id=${checkedID}></input><img src=${imgURL} id = ${imgID}></img>
                    <div> ${response.data[i].fileName}</div>`;
                }

                listArea.appendChild(new_img);

                const imgcard2 = document.getElementById("imgcardinner"+i);

                
                imgcard2.addEventListener("click",()=>{                     // 이미지 카드 클릭 이벤트
                    window.open("Storage/"+response.data[i].userID+response.data[i].title+response.data[i].fileName);
                });
                

                const imgCheckBox = document.getElementById("imgchecked"+i);

                imgCheckBox.addEventListener("change",(e)=>{            // 체크박스 체크 이벤트
                    let checked = document.getElementById("imgchecked"+i);
                    if(checked.checked){
                        setSelect(true);
                        setVisiblebtn("showvisiblebtn");
                        checkItem.add(response.data[i].fileName);
                        setCheckItem(checkItem);
                    
                    }else{
                        
                        checkItem.delete(response.data[i].fileName);
                        setCheckItem(checkItem);
                        
                        if(checkItem.size===0){
                            setVisiblebtn("hiddenvisiblebtn");
                        }
                    }
                    
                });


            }

        }catch(e){
            console.log(e);
        }
    }


    useEffect(()=>{
            setUserID(userIDInfo.userID);
            settitle(userIDInfo.title);
            createIMG(userIDInfo);
    },[]);

    return(
        <>
                 <LoginMain value={userIDInfo.userID}></LoginMain>
        <div className="ImgContainer">
            <div className="ImginnerWrap">

            <div className="toolWrap">
                <form encType="multipart/form-data">
                    <input type="file" id="file" multiple={true} onChange={onClickAdd} style={{display:"none"}}></input>
                    <label htmlFor="file">추가</label>
                </form> 
                
                <div className={visiblebtn} onClick={onClickDelete}>삭제</div>
                <div className={visiblebtn} onClick={onClickDownload}>다운로드</div>
                <div className={visiblebtn} onClick={onClickAllSelect}>{AllSelectID}</div>
            </div>  

            <div className="sideTextBox">
            Album imgages
            </div>    
            <div className="secondinnerWrap">
            
            <div className="ImgListWrap">
            <div className="albumImgText"><span id="spanTitle">{userIDInfo.title}</span><span>{date}</span></div>
            
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