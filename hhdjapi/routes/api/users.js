//用户管理api接口
const User = require("../../model/User.js")
const express = require("express")
const router = express.Router()
const passport = require("passport") //验证token
const bcrypt = require('bcrypt')//引入加密的包


//重置密码
router.post("/reset", (req, res) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: "123456"
    }
    console.log(newUser);
    

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) console.log(err);
            newUser.password = hash;
            
            User.findByIdAndUpdate({ _id: req.body._id }, { $set: newUser }, { new: true }).then(information => {
                res.json({
                    code: 1,
                    msg: '密码重置成功'
                })
            })
        })
    })
})



//添加用户信息
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const arr = {}
    arr.username = req.body.username
    arr.document = req.body.document
    arr.tel = req.body.tel
    arr.integral = req.body.integral
    arr.status = req.body.status
    arr.password = "123456"

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(arr.password, salt, function (err, hash) {
            if (err) console.log(err);
            arr.password = hash;
            new User(arr).save().then(information => {

            delete information.password;
                
                res.json(information)
            })

        })
    })
})

//获取所有用户信息
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res) => {
    
    User.find().then(information => {
        if (!information) {
            return res.status(404).json('没有用户信息')
        } else {
            // res.json(information.map(item=>delete item.password))
            res.json(information)
        }
    })
})

//查询某个用户的信息
router.get("/find/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

    User.findOne({ _id: req.params.id }).then(information => {
        if (!information) {
            return res.status(404).json('没有查到该用户信息')
        }
        res.json(information)

    })
})

//修改用户信息
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

    const arr = {}
    arr.username = req.body.username
    arr.doucument = req.body.doucument
    arr.tel = req.user.tel
    arr.integral = req.user.integral
    arr.status = req.user.status
    arr.passport = req.user.status
    arr.last_time = req.user.last_time

    User.findByIdAndUpdate({ _id: req.params.id }, { $set: arr }, { new: true }).then(information => {
        res.json(information)
    })
})

module.exports = router