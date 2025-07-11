const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);    
app.use('/', mainRoutes);        


app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});