const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require("express-session");
const app = express()

/*----------------------------------------------------------------------------*/
//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/djdb', { useNewUrlParser: true }).then(() => {
    console.log(`数据库连接成功...`);
}).catch(err => {
    console.log(err);
})

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))



/*----------------------------------------------------------------------------*/
//配置跨域问题
app.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    // res.header("Access-Control-Allow-Credentials", "true");//处理cookie信息，如果有，并且不对每次请求都新开一个session
    next();
});


/*----------------------------------------------------------------------------*/

//引入二级路由
let mpage = require('./routes/api/mpage')
let users = require('./routes/api/users')
let comments = require('./routes/api/comments')
let posts = require('./routes/api/posts')
let focus = require('./routes/api/focus')
let reports = require('./routes/api/reports')
let news = require('./routes/api/news')
let summarys  = require('./routes/api/summarys')


//一级路由
app.use('/api/mpage',mpage)
app.use('/api/users', users)
app.use('/api/comments', comments)
app.use('/api/posts',posts)
app.use('/api/focus',focus)
app.use('/api/reports',reports)
app.use('/api/news',news)
app.use('/api/summarys',summarys)


/*----------------------------------------------------------------------------*/
// 配置passprot
app.use(passport.initialize());  // 初始化passport 
require("./config/passport")(passport)  //导入配置文件

/*----------------------------------------------------------------------------*/
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})