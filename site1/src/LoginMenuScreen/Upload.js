import React,{useState,useEffect,useCallback, useMemo} from "react";
import "../LoginMenuScreen/Upload.css";
import {useNavigate, useLocation} from "react-router-dom";

const Upload = () =>{


    const [id, setId] = useState('');

    const location = useLocation();

    const navigate = useNavigate();

    const userIDInfo = {...location.state};

    const [uploadFile, setUploadFile] = useState([]);

    const [fileName, setFileName] = useState([]);

    const uploadLableHandle = (e) =>{
        const uploadFileList = e.target.files;

        for(let i =0; i<uploadFileList.length; i++){
            setUploadFile(uploadFileList[i]);
            console.log(uploadFileList[i]);
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
                    <input type="text" className="inputTitle"></input>
                </div>

                <div className="dateWrap">
                <div className="text2">date</div>
                <input type="date" className="inputDate"></input>
                </div>
                </div>
                
                <div className="fileUploadArea">
                <input type="file" id="file" multiple={true}  onChange={uploadLableHandle}style={{display:"none"}}></input>
                <label className="fileLable" htmlFor="file" >
                    <div>파일 첨부</div>
                </label>

                </div>


                <input type="button" className="uploadButton" value="확인" onClick={()=>{
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