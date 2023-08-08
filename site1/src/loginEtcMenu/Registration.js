import React,{useState} from "react";
import "../loginEtcMenu/Registration.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {GiBowlSpiral} from 'react-icons/gi'; 


const Registration = () =>{
    
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [checkPw, setcheckPw] = useState('');
    const [phonNumber, setPhonNumber] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [idValid, setIdValid] = useState(false);  // 아이디 형식 에러메시지를 위함
    const [pwValid, setPwValid] = useState(false);  // 비밀번호 형식 에러메시지를 위함
    const [emailValid, setEmailValid] = useState(false); // eamil 형식 확인 RFC 5322 정규식 사용
    const [checkPwValid, setCheckPwValid] = useState(false);  // 비밀번호와 비밀번호 확인의 입력값이 같은지 확인하기 위함
    const [checkDuplicationID, setCheckDuplicationID] = useState(false);  // 아이디 중복 확인

    

    const [division, setDivision] = useState(false); // 데이터 저장과 아이디 중복확인을 구분짓기 위함

    const navigate = useNavigate();

    const idHandle = (e) => {               // 아이디 형식이 맞는지 확인
        setId(e.target.value); 
        setDivision(false);
        if(e.target.value.length>=3){
           
            setIdValid(true);
        }else{
            setIdValid(false);
        }
    }


    const pwHandle = (e) => {                // 비밀번호 형식이 맞는지 확인
        setPw(e.target.value); 
        
        const regex =  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,50}$/;
        
        if(regex.test(pw)){
            setPwValid(true);
        }else{
            setPwValid(false);
        }
    }

    const checkPWHandle = (e) => {          // 비밀번호 재입력시 비밀번호가 동일한지 확인
        setcheckPw(e.target.value);

        if(checkPw === pw){
            setCheckPwValid(true);
        }else {
            setCheckPwValid(false);
        }
    }

    

    const checkEmailHandle = (e) => {
        setEmail(e.target.value);

        const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(regex.test(email)){
            setEmailValid(true);
        }else {
            setEmailValid(false);
        }
    }
    
    const duplicationCheckID = async() =>{  // 아이디 중복 체크
    
        if(!idValid){
            alert("아이디 형식을 맞춰주세요.");
        } 
        else{
            setDivision(true);

            let respons = await axios.get('http://localhost:8080/Register',{
                params: {
                    'id' : id
                }
             });
             try{
                if(respons.data[0].id === id){
                    alert("이미 존재하는 아이디 입니다.");
               }
             }
             catch(e){
                setCheckDuplicationID(true);
                alert("사용 가능한 아이디 입니다.");
             }
           
      
        }
        
        
      

    }

    const inputData = async() => {    // 데이터 저장

        setDivision(false);

        if(id.length === 0 || !idValid){
            alert('아이디를 입력해주세요.');
        }
        else if(!checkDuplicationID || division === false){
            alert('아이디 중복확인을 해주세요.');
        }
        else if(pw.length === 0 || !pwValid){
            alert('비밀번호를 입력해주세요.');
        }     
        else if(name.length === 0 && pw === checkPw){
            alert('이름을 입력해주세요.');
        }else if(pw === checkPw && (email.length === 0 || !emailValid)){
            alert('이메일을 입력해주세요.');
        }else if(pw === checkPw && phonNumber.length === 0){
            alert('핸드폰 번호를 입력해주세요.');
        }else if( phonNumber.length >= 12 || phonNumber.length < 10){
            alert('핸드폰 번호를 형식에 맞게 입력해주세요.');
        }
        else {
            if(pw === checkPw){
                 axios.post('http://localhost:8080/Register',{
                    id : id,
                    name : name,
                    pw : pw,
                    email : email,
                    phonNumber : phonNumber
        
                });
                alert("회원가입 성공");
               navigate("/SignUp");
            }
            else {
                alert('비밀번호가 일치하지 않습니다.');
            }
            
           
        }
       
        
    }

    const goHome = ()=>{
        window.history.replaceState(null,null,"/");
        navigate("/");
    }


    return (

        

        <div>
            <div className="RegistrationContainer">

            <div className="goBackHome_Registraition" onClick={goHome}>
            <div><GiBowlSpiral className="homeICON_Registration"></GiBowlSpiral>MyStory</div>
          </div>

                <div className="infoWrap">
                    <h2 className="texts">회원가입</h2>
                    
                    <div className="infoinputWrap">
                    
                    <div className="textWrapBox"> 
                    <h3 className="inputTextName">아이디 </h3>
                    <div className="errorMSG">
                            {
                                !idValid&&0<id.length&&(
                                <div>아이디를 3자 이상 입력해주세요.</div>
          
                                 )
          
                            }
                          
                    </div>
                    </div>
                    <div className="idBox">
                    <input type="text" className="id" placeholder="아이디를 3자 이상 입력해주세요." value={id} onChange={idHandle}></input>
                    <button className="checkID" onClick={duplicationCheckID}>중복확인</button>
                    </div>
                    </div>

                    <div className="infoinputWrap">
                   <div className="textWrapBox"> 
                   <h3 className="inputTextName">비밀번호 </h3>
                    <div className="errorMSG">           
                            {
                                     !pwValid && pw.length > 0 && (
                                        <span>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</span>
                                    )
          
                            }
                    </div>
                   </div>
                   
                    <input type="password" className="password" placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)" value={pw} onChange={pwHandle}></input>
                    </div>

                    <div className="infoinputWrap">
                    <h3 className="inputTextName">비밀번호 확인 </h3>
                    <input type="password" className="checkpassword" placeholder="비밀번호 재입력" value={checkPw} onChange={checkPWHandle}></input>
                    </div>

                    <div className="infoinputWrap">
                        <h3 className="inputTextName">이름 </h3>
                    <input type="text" className="name"  placeholder="이름을 입력해 주세요." value={name} onChange={(e)=>{ setName(e.target.value); }}></input>
                    </div>

                    <div className="infoinputWrap">
                    <h3 className="inputTextName">Email </h3>
                    <input type="email" className="email" placeholder="이메일 입력" value={email} onChange={checkEmailHandle}></input> 
                   
                    </div>

                    <div className="infoinputWrap">
                    <h3 className="inputTextName" >핸드폰 번호 </h3>
                    <input className="phonNumber" placeholder="휴대폰 번호 입력('-'제외 11자리 입력)" onChange={(e)=>{ setPhonNumber(e.target.value); }}></input>
                    </div>

                        <div className="infoinputWrap">
                            <input type="button" value="확인" className="registerbtn" onClick={inputData}></input>
                        </div>
                     </div>

            </div>


        </div>
    )
}
export default Registration;