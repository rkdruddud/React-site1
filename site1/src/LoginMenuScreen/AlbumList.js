import React,{useState, useEffect,} from "react";
import { useNavigate, useLocation} from "react-router-dom";

import "../LoginMenuScreen/AlbumList.css";

const AlbumList = () => {

    const navigate = useNavigate();
    
    const location = useLocation();

    const [id, setId] = useState('');


    const userIDInfo = {...location2.state};


    useEffect(()=>{
      setId(userIDInfo.id);
    },[]);

    return (
        <>
        <div className="fullContents">

            <div className="innerScroll">

                <div className="itemContent">
                    <div className="albumCard">
                    
                    <div className="albumTitle"></div>
                    </div>


                </div>

            </div>


        </div>
        
        
        </>

    )
}

export default AlbumList;