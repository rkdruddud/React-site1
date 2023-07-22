import React ,{useState} from "react";
import "../loginEtcMenu/ChangePW.css";


const ChangePW = () =>{

    const [checkPW, setCheckPW] = useState('');
    const [changePW, setChangePW] = useState('');
    
    return (
        <>
        <div className="newPwContentWrap">
            <div className="newPwBoxWrap">
            <h2>비밀번호 변경</h2>
            <hr></hr>
                <div className="newPWinnerContainer">

                <div className="inputinfoWrap">
                    <h3 className="Texts">새 비밀번호</h3>
                    <input type="password" className="inputNewPw" placeholder="새 비밀번호를 입력해주세요."></input>
                </div>

                <div className="inputinfoWrap">
                    <h3 className="Texts">새 비밀번호 확인</h3>
                    
                    <input type="password" className="inputNewPw" placeholder="새 비밀번호를 다시 한번 입력해주세요."></input>
                
                    
                </div>

                <div className="inputinfoWrap">
                    <input type="Button" className="confirmBtn" value="확인"></input>
                </div>

                </div>
                
                
            </div>

        </div>
        
        </>
)
}

export default ChangePW;
