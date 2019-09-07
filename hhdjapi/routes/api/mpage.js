const Mpage = require("../../model/Mpage.js")
const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');//引入生成token的包
const bcrypt = require('bcrypt')//引入加密的包
const keys = require("../../config/keys")//引入密钥
const passport = require("passport") //验证token

//注册接口
router.post("/register", (req, res) => {
    Mpage.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json("邮箱已经被注册")
        } else {
            const newUser = new Mpage({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser.save().then(user => res.json(
                        res.json({
                            code: 1,
                            msg: '注册成功'
                        })
                    )).catch(err => res.json(err))
                })
            })
        }
    })
})

//登录接口
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Mpage.findOne({ email }).then(abc => {
        if (!abc) { return res.status(404).json("用户名不存在") }
        bcrypt.compare(password, abc.password).then(isMatch => {
            if (isMatch) {
                const arr = {
                    id: abc.id,
                    name: abc.name,
                    email: abc.email
                }
                jwt.sign(arr, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        code: 1,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json("密码错误")
            }
        })
    })
})

// 获取用户信息接口
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
})

//公共删除方法接口
router.get('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
    let collection = req.query.collection
    let id = req.query.id
    require("../../model/" + collection).findOneAndDelete({ _id: id }).then(() => {
        res.json({
            code: 1,
            message: '删除成功'
        })
    })
})

//公共更改状态接口
router.get('/changeStatus', passport.authenticate('jwt', { session: false }), (req, res) => {
    let collectionName = req.query.collectionName   //得到集合名
    let id = req.query.id   //id
    require('../../model/' + collectionName).findOne({ _id: id }).then((data) => {
        // console.log(data);
        if (data.status == 1) {
            var json = {
                status: 0
            }
        }else{
            var json = {
                status: 1
            }
        }
        require('../../model/' + collectionName).findOneAndUpdate({ _id: id },{$set:json},{new:true}).then(data => {
            if (data) {
                // console.log(data);
                res.json({
                    code: 1,
                    msg: "更新成功"
                })
            } else {
                res.json({
                    code: 0,
                    msg: "更新失败"
                })
            }
        })
    })
})

module.exports = router