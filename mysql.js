
const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'itc'
});


conn.connect(err=>{
    if(err) throw err;
});

module.exports = conn;