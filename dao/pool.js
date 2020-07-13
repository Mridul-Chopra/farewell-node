const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit     :       process.env.connectionLimit,
    host                :       process.env.host,
    user                :       process.env.user,
    password            :       process.env.password,
    database            :       process.env.database,
    port                :       process.env.dbPort
});

module.exports = pool;