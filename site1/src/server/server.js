
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 8080; //포트번호 설정

const mysql = require('mysql');
const db = require('./lib/db');

//const db = require('/reactProject1/site1/build/indexc');

const sessionOption = require('./lib/sessionOption');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');


// 메일을 보내기 위한 모듈 3가지
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const mgTransport = require('nodemailer-mailgun-transport');


// 본인의 소스코드에서 apikey, domain이 적혀있는 env 파일을 지정.
dotenv.config({path: path.resolve(__dirname, ".env")});

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

app.get('/Findid', (req, res)=>{
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

app.get('/FindPW', (req, res)=>{
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



app.post('/FindPW', async (req,res) => {
    const toAdress = req.body.email;
    const secretkey = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');
    
    console.log(toAdress);

    const email = {
        from: "rkdruddud1@naver.com",
        to : toAdress,
        subject : "MyStroy Change password Secret Key",
        html : `<b>Your Change password Secret key ${secretkey}</b>`,
    };

    const auth = {
        auth:{
            api_key: process.env.MAILGUN_APIKEY,
            domain: process.env.MAILGUN_DOMIN,
        },
    };

    const nodemailerMailgun = nodemailer.createTransport(mgTransport(auth));

    nodemailerMailgun.sendMail(email, (error, info) =>{
        console.log(email);
        if(!error){
            console.log(secretkey);
            console.log(`${info}`);
            res.send(secretkey);
        }else{
            console.log(error);
            console.log(`${error}`);
        }
    })
});
/*
app.post('/FindPW', async (req,res) => {
    const toAdress = req.body.email;
    const secretkey = ((Math.round(Math.random() * 1000000)) + '').padStart(6, '0');
    
    console.log(toAdress);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.MAILGUN_ID,
            pass: process.env.MAILGUN_PASSWORD,
        },
    });

    try{
        const info = await transporter.sendMail({
            from: `"REACT_EXPRESS" <${process.env.GMAIL_ID}>`,
            to : toAdress,
            subject : "MyStroy Change password Secret Key",
            html : `<b>Your Change password Secret key ${secretkey}</b>`,
        });
        console.log(secretkey);
        res.send(secretkey);
    }
    catch(e){
        console.log(e);
        
    }

});
*/
