import React, {useState} from "react";
import "../loginEtcMenu/FindID.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {GiBowlSpiral} from 'react-icons/gi';

const FindID = () =>{
    
    const [name, setName] = useState('');
    const [phonNumber, setPhonNumber] = useState('');

    const phonNumberHandle = (e) =>{            
        setPhonNumber(e.target.value);      
    }
   
    const nameHandle = (e)=>{
        setName(e.target.value);
    }

    const navigate = useNavigate();

    const searchID = async() =>{

        let respons = await axios.get('http://localhost:8080/Findid',{
            params:{'name': name,
            'phonNumber' : phonNumber}
        });
        try{
            if(respons.data[0].id.length>0){
                alert("아이디는 "+respons.data[0].id+ " 입니다.");
                navigate("/Signup");
            }
            else{
                alert("조회된 아이디가 없습니다.");
            }
        }catch(e){
            alert("조회된 아이디가 없습니다.");
        }






    }
    
    const goHome = ()=>{
        window.history.replaceState(null,null,"/");
        navigate("/");
    }


    return (

        <div className="idContainer">

<div className="goBackHome_FindID" onClick={goHome}>
            <div><GiBowlSpiral className="homeICON_FindID"></GiBowlSpiral>MyStory</div>
          </div>

            <div className="idBoxWrap">
            <h2 className="Texts"> 아이디 찾기</h2>
            <hr></hr>
                <div className="innerContainer">

                <div className="inputinfoWrap">
                    <h3 className="Texts">이름</h3>
                    <input type="text" className="inputName" onChange={nameHandle} placeholder="이름을 입력해주세요."></input>
                </div>

                <div className="inputinfoWrap">
                
                    <div className="textWrapBox"> 
                    <h3 className="Texts">핸드폰 번호</h3>
                    <div className="errorMSG">           
                            {
                                      (phonNumber.length >= 12 || (phonNumber.length <= 10 && phonNumber.length >0)) && (
                                        <span>핸드폰 번호를 제대로 입력해주세요.</span>
                                    )
          
                            }
                    </div>
                   </div>

                
                    <input type="text" className="inputPhoneNumber" value={phonNumber} onChange={phonNumberHandle} placeholder="핸드폰 번호를 입력해주세요."></input>
                </div>

                
                <div className="inputinfoWrap">
                    <input type="Button" className="confirmBtn" value="조회" onClick={searchID}></input>
                </div>

                </div>
                
         
            </div>
            

        </div>
    )
}
export default FindID;