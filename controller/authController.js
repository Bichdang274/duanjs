const connection = require('../model/db');

exports.getLogin = (req, res) => {
  const username = req.query.username || '';
  res.render('login', { username });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    }
    console.log("Đăng nhập với:", username, password);
    if (results.length > 0) {
      res.send("Đăng nhập thành công"); 
    } else {
      res.send("Sai tài khoản hoặc mật khẩu");
    }
  });
};


exports.getSignUp = (req, res) => {
  const username = req.query.username || '';
  res.render('sign_up', { username, message: null});
};

exports.postSignUp = (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (err) => {
    if (err) {
      return res.render('sign_up', {username, message: 'Tên tài khoản đã tồn tại hoặc có lỗi xảy ra!' });
    }
    res.render('sign_up', {username, message: 'Thêm tài khoản thành công!' });
  });
};


