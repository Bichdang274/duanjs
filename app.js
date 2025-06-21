const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000;



// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);    // Các route sẽ thành /auth/auth/auth/login, /auth/auth/auth/sign_up
app.use('/', mainRoutes);        // Trang chính


app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});