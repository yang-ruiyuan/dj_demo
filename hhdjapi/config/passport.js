// 专门用来配置Passport  验证jwt   配置的话，搜索passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys')
const mongoose = require('mongoose')
// const User = mongoose.model('User')    //把User的model导入
const Mpage = require('../model/Mpage')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        // console.log(jwt_payload)  // 保存了解析后的用户信息 
        // console.log(done)  // [Function: verified]
        //从数据库里找该用户的信息，并返回
        Mpage.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user) //返回用户信息
            }
            return done(null, false)
        }).catch(err => console.log(err))
    }));
}

