import React,{useState,useEffect,useCallback, useMemo} from "react";
import "../LoginMenuScreen/Upload.css";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";


const Upload = () =>{

   
    const location = useLocation();

    const navigate = useNavigate();

    
    const [id, setId] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [date, setDate] = useState('');


    const [count, setCount] = useState(0);
   
    const userIDInfo = {...location.state};

    const [uploadFile, setUploadFile] = useState([]);
   
    


   const albumTitleHandle = (e)=>{
    setAlbumTitle(e.target.value);
   }

   const dateHandle = (e) =>{
    setDate(e.target.value);
   }

    const uploadLableHandle = async(e) =>{       // 첨부한 파일명 리스트 생성
        const uploadFileList = e.target.files;
        
        setUploadFile(uploadFileList);

        let listArea = document.getElementById("fileList");
       let num =count;
    
        for(let i =0; i<uploadFileList.length; i++){
            

            console.log(e.target.files[i]);  
            

            let new_list = document.createElement("div");
            new_list.setAttribute("class","fileitem");
            new_list.setAttribute("onClick",()=>{
                    listArea.removeChild(listArea.new_list);
                    console.log("삭제");
            });
            new_list.innerHTML= e.target.files[i].name;
            listArea.appendChild(new_list);
            num++;
        }

        setCount(num);
        

    }

    const submitUploadFile = () =>{
        const formData = new FormData();
        for(let i =0; i<uploadFile.length; i++){
            
            formData.append("file", uploadFile[i]);     
            
        }
        console.log(id);
       
        axios.post('http://localhost:8080/Upload',formData,{
            params:{
                id:id,
                title: albumTitle,
                date:date,
                fileName:uploadFile
            }
        });
        
        
        alert("업로드 완료");

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
                
                <form className="fileUploadArea" encType="multipart/form-data">
                <input type="file" id="file" multiple={true}  onChange={uploadLableHandle} style={{display:"none"}}></input>
                <label className="fileLable" htmlFor="file" >
                    <div>파일 첨부</div>
                </label>

                </form>

                <div className="fileListWrap">
                    <div id="fileList" >
                        
                    </div>
                </div>


                <button type="submit" className="uploadButton" onClick={submitUploadFile}>
                 확인
                </button>

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