const mysql = require("mysql2/promise");

const mysqlpool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Stephen14$',
    database:'employeemanagement'
});

module.exports = mysqlpool;