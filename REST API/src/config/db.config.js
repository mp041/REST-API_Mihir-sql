const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host:'localhost',
    user: 'mihir',
    password : 'ubuntu',
    database : 'employeedb'
});

dbConn.connect((err) => {
    if(!err){
        console.log("database successfully connected.");
    }else{
        throw err;
    }
});

module.exports = dbConn;
