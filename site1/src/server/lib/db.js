const mysql = require('mysql');
const db = mysql.createPool({
    host:'127.0.0.1',
    user: 'root',
    password: 'ruddud12!@',
    database:'userinfo',
    port: 3306,
    multipleStatements: true // 다중쿼리 사용 설정
});

/*
const db = mysql.createPool({
    host:'127.0.0.1',
    user: 'root',
    password: '0000',
    database:'userinfo',
    port: 3306,
    multipleStatements: true // 다중쿼리 사용 설정
});
*/

module.exports = db;