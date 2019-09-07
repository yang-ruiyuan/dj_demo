const express = require('express')
const router = express.Router()
const passport = require('passport')

const Comment = require('../../model/Comment')

//添加评议接口
router.post('/add',passport.authenticate("jwt", { session: false }),(req, res) => {
    let commentsFileds = {}
    commentsFileds.description = req.body.description
    commentsFileds.content = req.body.content
    commentsFileds.status = req.body.status
    console.log(commentsFileds);
    new Comment(commentsFileds).save().then(() => {
        res.json({
            code: 1,
            msg: '添加成功'
        })
    })
})

//获取评议列表接口
router.get('/list',passport.authenticate("jwt", { session: false }),(req,res)=>{
    Comment.find().then(comment=>{
        if(!comment){
            return res.status(404).json({
                code:0,
                msg:'没有内容'
            })
        }
        res.json(comment)
    })
})

//修改评议接口
router.post('/edit/:id',passport.authenticate("jwt", { session: false }),(req,res)=>{
    let commentsFileds = {}
    commentsFileds.description = req.body.description
    commentsFileds.content = req.body.content
    commentsFileds.status = req.body.status
    Comment.findOneAndUpdate({_id:req.params.id},{$set:commentsFileds},{new:true}).then(()=>{
        res.json({
            code:1,
            msg:'更新成功'
        })
    })
})

//查找评议接口
router.get('/find/:id',passport.authenticate("jwt", { session: false }),(req,res)=>{
    Comment.findOne({_id:req.params.id}).then(data=>{
        if(data){
            res.json(data)
        }
    })
})

module.exports = router