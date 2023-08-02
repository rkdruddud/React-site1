const useState = require('react');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 8080; //포트번호 설정

const mysql = require('mysql');
const db = require('./lib/db');

//const db = require('../../public/Storage');

const sessionOption = require('./lib/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');


// 메일을 보내기 위한 모듈 3가지
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');





// 본인의 소스코드에서 apikey, domain이 적혀있는 env 파일을 지정.
dotenv.config({path: path.resolve(__dirname, "../../.env")});

app.use(express.static(path.join(__dirname, '../../build')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(8080, function() {
    console.log('listening on 8080');
});

/*const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(sessionOption);

app.use(session({
    key: 'session_cookie_name',
    secret: '~',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));*/

app.get('/',(req, res) => {
    
   // req.sendFile(path.join(__dirname, '../../build/index.html'));
   console.log("home");
});

app.post('/Register', (req,res)=>{      // 회원정보 저장
    const userID = req.body.id;
    const password = req.body.pw;
    const phonNumber = req.body.phonNumber;
    const email = req.body.email;
    const name = req.body.name;
    const login = Number.parseInt(0);
    const division = req.body.division;

    
        
            db.query('INSERT INTO userinfo (id, name, password, email, phonNumber, login) VALUES(?,?,?,?,?,?);', [userID, name, password,email,phonNumber,login], function (error, results, fields){
                if(error) throw error;
                else{
                   console.log("회원가입성공");
                }
            });

});


app.get('/Register', (req, res)=>{      // 아이디 중복 클릭시 아이디 조회
    
    const params = req.query.id;
    db.query('SELECT id FROM `userinfo` WHERE `id` = ?;', params, (error, data)=>{
        if(!error){
            console.log(data);
            if(data){
                res.send(data);
            }else {
                console.log("아이디 사용가능");
            }
            
        } else {
            res.send(error);
        }
    });
});


app.get('/Signup', (req, res)=>{        // 로그인 시 아이디와 비밀번호 조회
    
    const params = req.query.id;
   
    db.query('SELECT id, password FROM `userinfo` WHERE `id` = ?;', params,  (error, data) =>{

        if(!error){
              res.send(data);

        }else{
            res.send(error);
        }

    });
});

app.post('/Signup', (req, res)=>{        // 로그인 성공시 DB의 login 값 변경
    
    const userID = req.body.id;
    
   
    db.query('UPDATE `userinfo` SET `login`= ? WHERE `id` = ?;',['1',userID] ,  (error, data) =>{

        if(!error){
            console.log("로그인 성공");
          
        }else{
            console.log(error);
            res.send(error);
        }

    });
});


app.post('/LogOut', (req, res)=>{        // 로그인 성공시 DB의 login 값 변경
    
    const userID = req.body.id;
   
    db.query('UPDATE `userinfo` SET `login`= ? WHERE `id` = ?;',['0', userID] ,  (error, data) =>{

        if(!error){
            console.log(userID);
            console.log("로그아웃");
          
        }else{
            console.log(error);
            res.send(error);
        }

    });
});

app.get('/Findid', (req, res)=>{        // 아이디 찾기
    const userName = req.query.name;
    const userPhonNumber = req.query.phonNumber;
    
    db.query('SELECT id FROM `userinfo` WHERE `name` = ? AND `phonNumber` = ?', [userName, userPhonNumber], (error, data) =>{
        if(!error){
           
            res.send(data);
        }else {
            console.log(error);
            res.send(error);
        }
    });
});

app.get('/FindPW', (req, res)=>{            // 비밀번호 변경을 위한 아이디의 메일을 확인
    const params = req.query.id;
    
    db.query('SELECT email FROM `userinfo` WHERE `id` = ?', params, (error, data) =>{
        if(!error){
            console.log(data);
            res.send(data);
        }else {
            console.log(error);
            res.send(error);
        }
    });
});

app.post('/FindPW', async (req,res) => {   // 인증 메일 전송
    const toAdress = req.body.email;
    const secretkey = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');
   
    const transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port:465,
        secure:false,
        auth:{
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        },
    });
    console.log(toAdress);
    try{
        const info = await transporter.sendMail({
            from: `"REACT_EXPRESS" <${process.env.GMAIL_ID}>`,
            to: toAdress,
            subject: '인증번호 입니다.',
            text: `인증번호는 : ${secretkey} 입니다.`
        });
        
        res.sendStatus(secretkey);
        console.log(secretkey);
    }
    catch(e){
        console.log(e);
    }
   
   
});

app.post('/ChangePW', (req, res)=>{        // 로그인 성공시 DB의 login 값 변경
    
    const userPW = req.body.changePW;
    const userID = req.body.id;
   
    db.query('UPDATE `userinfo` SET `password`= ? WHERE `id` = ?;',[userPW, userID] ,  (error, data) =>{

        if(!error){
            console.log(userPW);
            console.log("비밀번호 변경");
          
        }else{
            console.log(error);
            res.send(error);
        }

    });
});


/*업로드한 이미지들의 url을 전달. 미리보기 가능하도록 함.
app.post("/file", upload.array("img",30),async (req, res, next)=>{

    console.log("파일 이름 : ", req.files);

    let urlArray = new Array();
    for(let i=0; i<req.files.length; i++){
        urlArray.push(`/MyStory/${req.files[i].filename}`);
    }
    let jsonUrl = JSON.stringify(urlArray);
    res.json(jsonUrl);
});*/



// 서버에 multer을 이용한 스토리지 구성.
const storage = multer.diskStorage({
    destination:"../../public/Storage"
    ,
    filename : function(req, file, cb){
        const uniqueSurffix = Date.now();
        const userID = req.query.id;
        const title = req.query.title;
        const date = req.query.date;
    
        cb(null,req.query.id+req.query.title+file.originalname);

        db.query('INSERT INTO album (userID, title, date, fileName) VALUES(?,?,?,?);',[userID, title, date, file.originalname] ,  (error, data) =>{
    
            if(!error){
            
                console.log("파일 업로드 완료");
              
            }else{
                console.log(error);
                res.send(error);
            }
    
        });
    },
});

// storage 업로드 
const upload = multer({
    storage:storage,
    limits: {fileSize: 100000000}
})


app.post("/Upload", upload.array("file",30),(req, res)=>{
   
    console.log("업로드");
    
});

app.get("/MyStory",(req,res)=>{

    const params = req.query.id;
    console.log(params);
    db.query('SELECT * FROM `album` WHERE `userID` = ?', params, (error, data) =>{
        if(!error){
            console.log(data);
            res.send(data);
        }else {
            res.send("none");
        }
    });

});