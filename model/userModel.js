const db = require('./db'); // kết nối tới CSDL từ db.js

// Hàm đăng ký (INSERT)
exports.register = (username, password, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], callback);
};

// Hàm đăng nhập (SELECT)
exports.login = (username, password, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], callback);
};
