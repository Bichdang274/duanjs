const mysql = require('mysql2');

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bich270406@',
  database: 'login'
});

module.exports = connection;