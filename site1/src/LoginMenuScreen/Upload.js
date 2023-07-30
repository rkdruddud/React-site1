import React,{useState,useEffect,useCallback, useMemo} from "react";
import "../LoginMenuScreen/Upload.css";
import {useNavigate, useLocation} from "react-router-dom";

const Upload = () =>{

   
    const location = useLocation();

    const navigate = useNavigate();

    
    const [id, setId] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [date, setDate] = useState('');

   
    const userIDInfo = {...location.state};

    const [uploadFile, setUploadFile] = useState([]);
    const [fileName, setFileName] = useState([]);




   const albumTitleHandle = (e)=>{
    setAlbumTitle(e.target.value);
   }

   const dateHandle = (e) =>{
    setDate(e.target.value);
   }

    const uploadLableHandle = (e) =>{       // 첨부한 파일명 리스트 생성
        const uploadFileList = e.target.files;
        let listArea = document.getElementById("fileList");
       
    
        for(let i =0; i<uploadFileList.length; i++){
            setUploadFile(uploadFileList[i]);
            console.log(uploadFileList[i]);  

            let new_list = document.createElement("div");
            new_list.setAttribute("class","fileitem");
            new_list.innerHTML= e.target.files[i].name;
            setFileName(e.target.files[i].name);

            listArea.appendChild(new_list);             
        }

    }




    useEffect(()=>{
        setId(userIDInfo.userID);
    },[]);
    
    return (
        <>
        <div className="UploadContent">
            <div className="UploadContentWrap">
            
                <h2>Create your album</h2>
            
            <div className="uploadInnerWrap">
               
                <div className="headWrap">
                <div className="titleWrap">
                    <div className="text1">title</div>
                    <input type="text" className="inputTitle" onChange={albumTitleHandle} value={albumTitle}></input>
                </div>

                <div className="dateWrap">
                <div className="text2">date</div>
                <input type="date" className="inputDate" onChange={dateHandle} value={date}></input>
                </div>
                </div>
                
                <div className="fileUploadArea">
                <input type="file" id="file" multiple={true}  onChange={uploadLableHandle} style={{display:"none"}}></input>
                <label className="fileLable" htmlFor="file" >
                    <div>파일 첨부</div>
                </label>

                </div>

                <div className="fileListWrap">
                    <div id="fileList" >
                        
                    </div>
                </div>


                <input type="button" className="uploadButton" value="확인" onClick={()=>{
                    alert(albumTitle+"\n"+ date+ "\n"+ fileName[2]);
                    window.location.replace("/MyStroy");
                }}></input>

                <input type="button" className="cancleButton" value="취소" onClick={()=>{
                    window.location.replace("/MyStroy");
                }}></input>

            </div>

            </div>

        </div>
        </>
    )
}

export default Upload;