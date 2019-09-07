// 党员互动数据api接口
const express = require('express')
const Post = require('../../model/Post')
const router = express.Router()
const passport = require('passport')
// 检测能否连接成功
router.get('/',(req,res)=>{
    res.json('你好')
})

// 添加互动帖(创建集合用)
router.post('/add',passport.authenticate("jwt", { session: false }),(req,res)=>{
    const username = req.body.username
    const content = req.body.content
    const follow = req.body.follow
    let postsMsg = {
        username,
        content,
        follow
    }
    new Post(postsMsg).save()
    .then(post=>res.json({
        code:1,
        message:'添加帖子成功'
    }))
    .catch(err=>res.status(404).json({
        code:0,
        message:'帖子添加失败'
    }))
})

// 获取帖子列表
router.get('/list',passport.authenticate("jwt", { session: false }),(req,res)=>{
    Post.find({}).then(posts=>res.json(posts))
    .catch(err=>{
        res.status(404).json(err)
    })
})


module.exports = router