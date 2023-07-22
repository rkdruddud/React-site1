import React, {useEffect, useState} from "react";
import "./SignUp.css";
import LoginMain from "./LoginMain";
import FindID from "../loginEtcMenu/FindID";
import FindPW from "../loginEtcMenu/FindPW";
import Registration from "../loginEtcMenu/Registration";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import axios from "axios";


const SignUp = () => {

    const [id,setId] = useState('');
    const [pw,setPw] = useState('');
    
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    const [notAllow, setNotAllow] = useState(true);

    const [loginIdValid, setLoginIdValid] = useState(false);
    const [loginPwValid, setLoginPwValid] = useState(false);

    const navigate = useNavigate();

    

    const idHandle = (e) => {
        setId(e.target.value); 
        
        if(e.target.value.length>=3){
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }


    const pwHandle = (e) => {
        setPw(e.target.value); 
        
        const regex =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;
        
        if(regex.test(pw)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    useEffect(()=>{
          if(idValid&&pwValid){
           setNotAllow(false);
          }  
          else {
           setNotAllow(true);
          }
    },[idValid, pwValid]);


    const loginHandle = async() =>{   // 로그인 버튼 클릭 함수

        console.log("버튼 클릭");
      
        console.log(idValid);
        console.log(pwValid);
        let respons = await axios.get('http://localhost:8080/Signup',{
           params:{
            'id': id
           } 
         });
          
        try{
         
            if(respons.data[0].id === id && idValid){
                setLoginIdValid(true);
            
                try{
                   
                    
                    if(pw === respons.data[0].password && pwValid){
                        setLoginIdValid(true);
                        
                        
                    try{
                        
                        axios.post('http://localhost:8080/Signup',{  // 로그인 확인 값 업데이트
                        id:id
                        });
                       
                        alert("로그인 성공");
                        navigate("/LoginMain",{
                            state: {
                                userID : `${id}`
                            }
                        });   // 로그인 후 메인 페이지로 이동
                  
                    }catch(e){
                        alert("오류로 인한 로그인 실패");
                    }
                        
                   
                    }
                    else{
                        alert("비밀번호가 다릅니다.");  
                    }
                }catch(e){
                    setLoginPwValid(false);
                    alert("비밀번호가 다릅니다.");
                }

            }else{
                alert("등록된 아이디가 없습니다.");  
            }
            
        }catch(e){
            setLoginIdValid(false);
          alert("등록된 아이디가 없습니다.");  
        }

   
    }


    return (
        <>
        <div className="LoginBackground" >

        <div className="loginContainer">
                <h1 className="loginText">로그인</h1>

                <div className="contentWrap">

                <div className="contentInputWrap">
                <div className="InputWrap">
                <input type="text" className="Input" placeholder="아이디" value={id}
                onChange={idHandle}></input>
                </div>

                <div className="errorMessageWrap">
                <div>
                    {
                        !idValid&&0<id.length&&(
                            <div>아이디를 3자 이상 입력해주세요.</div>
                          
                        )
                    }
                </div>
                </div>
                </div>
                
                <div className="contentInputWrap">
                <div className="InputWrap">
                <input type="password" className="Input" placeholder="비밀번호" value={pw}
                onChange={pwHandle}></input>
                </div>
                
                <div className="errorMessageWrap">
                <div>
                    {
                        !pwValid && pw.length > 0 && (
                            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                        )
                    }
                </div>
                
                </div>
                </div>
                
        </div>

        
        <button className="LoginBtn" disabled={notAllow} onClick={loginHandle} >Login</button>
        
        <div className="etcContent">
       
            <Link to="/Registration" className="etcLink">회원가입</Link>
            <Link to="/FindID" className="etcLink">아이디 찾기</Link>
            <Link to="/FindPW" className="etcLink">비밀번호 찾기</Link>

        </div>          
        <Routes>
            <Route path="/Registration" element={<Registration/>}></Route>
            <Route path="/FindID" exact={true} element={<FindID/>}></Route>
            <Route path="/FindPW" exact={true} element={<FindPW/>}></Route>
        </Routes>
        </div>
        </div>
       
        </>
    )
}
export default SignUp;