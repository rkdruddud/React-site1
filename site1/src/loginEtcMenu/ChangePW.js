import React ,{useState, useEffect} from "react";
import "../loginEtcMenu/ChangePW.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {GiBowlSpiral} from 'react-icons/gi';

const ChangePW = () =>{

    const [checkPW, setCheckPW] = useState('');
    const [changePW, setChangePW] = useState('');
    const [id, setId] = useState('');

    const [changePWValid, setChangePWValid] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const userIDInfo = {...location.state};

    useEffect(()=>{
        setId(userIDInfo.userID);
        
    },[userIDInfo.userID]);

    

    const checkPWHandle =(e) =>{
        setCheckPW(e.target.value);
    }
    
    const changePWHandle =(e) =>{
        setChangePW(e.target.value);

        const regex =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;
        
        if(regex.test(changePW)){
            setChangePWValid(true);
        }else{
            setChangePWValid(false);
        }

    }

    const onChangePW = () =>{
        
        if(changePWValid){

            if(changePW === checkPW){
                axios.post('http://localhost:8080/ChangePW',{
                    changePW:changePW,
                    id:id
                })
                alert("비밀번호가 변경되었습니다.");
                window.location.replace("/SignUp");
                
    
            }else {
                alert("비밀번호가 서로 다릅니다.");
            }
        }else{
            alert("비밀번호 형식에 맞게 입력해주세요.");
        }
    }

    const goHome = ()=>{
        window.history.replaceState(null,null,"/");
        navigate("/");
    }


    return (
        <>
        <div className="newPwContentWrap">

        <div className="goBackHome_ChangePW" onClick={goHome}>
            <div><GiBowlSpiral className="homeICON_ChangePW"></GiBowlSpiral>MyStory</div>
          </div>


            <div className="newPwBoxWrap">
            <h2>비밀번호 변경</h2>
            <hr></hr>
                <div className="newPWinnerContainer">

                <div className="inputinfoWrap">
                <div className="textWrapBox"> 
                   <h3 className="inputTextNewPW">새 비밀번호</h3>
                    <div className="errorMSG">           
                            {
                                     !changePWValid && changePW.length > 0 && (
                                        <span>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</span>
                                    )
          
                            }
                    </div>
                   </div>
                    <input type="password" className="inputNewPw" onChange={changePWHandle} value={changePW} placeholder="새 비밀번호를 입력해주세요."></input>
                </div>

                <div className="inputinfoWrap">
                    <h3 className="Texts">새 비밀번호 확인</h3>
                    
                    <input type="password" className="inputNewPw" onChange={checkPWHandle} value={checkPW} placeholder="새 비밀번호를 다시 한번 입력해주세요."></input>
                        
                </div>

                <div className="inputinfoWrap">
                    <input type="Button" className="confirmBtn" onClick={onChangePW} value="확인"></input>
                </div>

                </div>
                
                
            </div>

        </div>
        
        </>
)
}

export default ChangePW;
