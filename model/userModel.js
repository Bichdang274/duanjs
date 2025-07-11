const db = require('./db'); 


exports.register = (username, password, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], callback);
};

exports.login = (username, password, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], callback);
};


