import React,{useState,useEffect} from "react";
import "../LoginMenuScreen/Upload.css";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import backImg from "../images/skynight3.jpg";



const Upload = () =>{

   
    const location = useLocation();

    const navigate = useNavigate();

    
    const [id, setId] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [date, setDate] = useState('');

    const [formClass, setFormClass] = useState('fileUploadAreaBasic');
    const [changeFileListWrap,setChangeFileListWrap] = useState('fileListWrapBasic');


    const [count, setCount] = useState(0);
   
    const userIDInfo = {...location.state};

    const [uploadFile, setUploadFile] = useState([]);
   
    


   const albumTitleHandle = (e)=>{
    setAlbumTitle(e.target.value);
   }

   const dateHandle = (e) =>{
    setDate(e.target.value);
   }


   useEffect(()=>{
    setId(userIDInfo.userID);
    
},[]);

    const uploadLableHandle = async(e) =>{       // 첨부한 파일명 리스트 생성
        const uploadFileList = e.target.files;
        
        setUploadFile(uploadFileList);

        let listArea = document.getElementById("fileList");
       let num =count;
        if(uploadFileList.length>0){
            setFormClass("fileUploadArea");
            setChangeFileListWrap("fileListWrap");
        }
        for(let i =0; i<uploadFileList.length; i++){
            
        
            let new_list = document.createElement("div");
            new_list.setAttribute("class","fileitem");
            new_list.setAttribute("onClick",()=>{
                    listArea.removeChild(listArea.new_list);
        
            });
            new_list.innerHTML= e.target.files[i].name;
            listArea.appendChild(new_list);
            num++;
        }

        setCount(num);
        

    }

    const submitUploadFile = () =>{         // 첨부한 파일 Storage와 Db에 저장
        const formData = new FormData();

        if(albumTitle.length===0){
            alert("제목을 입력해주세요.");
        }else if(date.length===0){
            alert("날짜를 선택해주세요.");
        }
        else{

            for(let i =0; i<uploadFile.length; i++){
            
                formData.append("file", uploadFile[i]);     
                
            }
        
           
            axios.post('http://localhost:8080/Upload',formData,{
                params:{
                    id:id,
                    title: albumTitle,
                    date:date,
                    fileName:uploadFile
                }
            });
        
            navigate("/MyStory",{
               state: {
                    userID: `${id}`
                }
            })

            alert("업로드 완료");    
        }
    }

    const onClickCancelBtn = ()=>{

        navigate("/CreateStory",{
            state: {
                 userID: `${id}`
             }
         });
    }

    
    return (
        <>
        <div className="UploadContent">
            <img src={backImg} className="backgroundImg"></img>
            <h2>Create your album</h2>
            <div className="UploadContentWrap">
            
                
            
            <div className="uploadInnerWrap">
               
                <div className="headWrap">
                <div className="titleWrap">
                    <div className="text1">title</div>
                    <input type="text" className="inputTitle" onChange={albumTitleHandle} value={albumTitle} placeholder="제목 입력"></input>
                </div>

                <div className="dateWrap">
                <div className="text2">date</div>
                <input type="date" className="inputDate" onChange={dateHandle} value={date}></input>
                </div>
                </div>
                <hr></hr>
                <form className={formClass} encType="multipart/form-data">
                <input type="file" id="file" multiple={true}  onChange={uploadLableHandle} style={{display:"none"}}></input>
                <label className="fileLable" htmlFor="file" >
                    <div>파일 첨부</div>
                </label>

                </form>

                <div className={changeFileListWrap}>
                    <div id="fileList" >
                        
                    </div>
                </div>


                <button type="submit" className="uploadButton" onClick={submitUploadFile}>
                 확인
                </button>

                <input type="button" className="cancleButton" value="취소" onClick={onClickCancelBtn}></input>

            </div>

            </div>

        </div>
        </>
    )
}

export default Upload;