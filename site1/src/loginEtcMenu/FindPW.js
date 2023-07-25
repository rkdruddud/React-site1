import React,{useState} from "react";
import "../loginEtcMenu/FindPW.css";
import axios from "axios";
import ChangePW from "./ChangePW";
import {useNavigate} from "react-router-dom";

const FindPW = () =>{
   
   const [visible, setVisible] = useState(false);
   const [text, setText] = useState('인증번호 전송');

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [secret, setSecret] = useState('');
    const [checkNumber, setCheckNumber] = useState('');

    const [checkNumValid, setCeckNumValid] = useState(false);

   

    const navigate = useNavigate();

    const idHandle = (e) =>{        //id 값 지정 및 유효성 검사
        setId(e.target.value);
    }

    const emailHandle = (e) =>{     //email 값 지정 및 유효성 검사
        setEmail(e.target.value);
        
    }

    const checkNumberHandle = (e) =>{        //인증번호 지정           
        setCheckNumber(e.target.value);
    }

   const textHandle = () =>{                // 버튼 텍스트 바꾸기위한 함수
    setText("인증번호 재전송");
   }

   const sendEmail = async(email)=>{   // 메일로 인증번호를 보내는 함수
       const respons2 = axios.post('http://localhost:8080/FindPW',{
            email : email
        });
        try{
             setSecret((await respons2).data);
        }catch(e){
            console.log(e);
        }
        
   }

   const visibleHandle = async() =>{       // 인증번호 전송후 인증번호 확인 입력 폼을 보여주는 함수
    
     const respons = await axios.get('http://localhost:8080/FindPW',{
        params:{
            'id': id
        }
    });
    
    try{
       
         if(id.length===0||id.length<3){
            
        alert("아이디를 제대로 입력해주세요.");

       }else if(email.length === 0){
            alert("인증번호를 받는 이메일을 입력해주세요.");
       }
        else if(email === respons.data[0].email){
           
            sendEmail(email);
            textHandle();
            setVisible(true);
            alert("메일로 인증번호가 전송되었습니다.");
        }else {
            alert("회원 정보와 입력된 정보가 다릅니다.\n"+"이메일을 다시 입력해주세요.");
            setVisible(false);
            setText("인증번호 전송");
        }
    }catch(e){
     console.log(e);  
     
     alert("오류로 인한 인증번호 전송 실패"); 
    }

    
   }

   const confirmationNumber = () =>{        //인증번호 확인
    
    if(checkNumber == secret){
        setCeckNumValid(true);
        alert("인증번호가 확인되었습니다.");
    }else {
        alert("인증번호가 일치하지 않습니다.");
        setCeckNumValid(false);
    }
   }

   const changePWbtnHandle = () =>{     //확인 버튼 클릭
    setVisible(false);

    if(checkNumValid){
        navigate("/ChangePW",{
            state: {
                userID : `${id}`
            }
        });
    }
    else{
        alert("이메일 인증을 해주세요.");
    }
   }

 
   
   
    return (

        <div className="pwContainer">
            <div className="pwBoxWrap">
            <h2 className="Texts"> 비밀번호 찾기</h2>
            <hr></hr>
                <div className="innerContainer">

                <div className="inputinfoWrap">
                    <h3 className="Texts">아이디</h3>
                    <input type="text" className="inputId" value={id} onChange={idHandle} placeholder="아이디를 입력해주세요."></input>
                </div>

                <div className="inputinfoWrap">
                    <h3 className="Texts">이메일</h3>
                    <div className="emailBox">
                    <input type="email" className="inputEmail" value={email} onChange={emailHandle} placeholder="이메일을 입력해주세요."></input>
                    <button className="sendbtn" onClick={visibleHandle}>{text}</button>
                    </div>
                </div>

               {visible &&
                <div className="inputinfoWrap">
                <h3 className="Texts">인증번호</h3>
                <div className="checkNumberBox">
                    
                    <input type="text" className="inputCheckNumber" value={checkNumber} onChange={checkNumberHandle} placeholder="인증번호를 입력해주세요."></input>
                    <button className="checkNumberbtn" onClick={confirmationNumber}>인증확인</button>
               </div>
                </div>
                }
                
                <div className="inputinfoWrap">
                    <input type="Button" className="confirmBtn" value="확인"  onClick={changePWbtnHandle}></input>
                </div>

                </div>
                
         
            </div>
            

        </div>
    )
}
export default FindPW;