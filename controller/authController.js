const connection = require('../model/db');

exports.getLogin = (req, res) => {
  const username = req.query.username || '';
  res.render('login', { username });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect(`/?username=${username}`);
    } else {
      res.send('Sai tài khoản hoặc mật khẩu');
    }
  });
};

exports.getSignUp = (req, res) => {
  const username = req.query.username || '';
  res.render('sign_up', { username });
};

exports.postSignUp = (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (err) => {
    if (err) return res.send('Lỗi khi thêm tài khoản: ' + err.message);
    res.redirect('/');
  });
};


