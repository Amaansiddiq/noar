const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Amaan9869',
  database: 'product_db'
});
  
const promisePool = pool.promise();

module.exports = promisePool;
