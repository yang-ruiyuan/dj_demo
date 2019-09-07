const express = require("express")
const Report = require("../../model/Report")
const passport = require("passport")  //验证token

const router = express.Router();

// 如果没有带token去访问 默认返回Unauthorized
// 带上token去访问  

// 获取所有的汇报列表 
router.get("/list", passport.authenticate("jwt",{session:false}),(req,res)=>{
    Report.find().then(report=>{
        if(!report){
            return res.status(404).json({
                code:0,
                msg:"查找失败"
            })
        }
        res.json(report)
    })
})

//查询汇报
// 获取某个的新闻数据
router.get("/list/:id", passport.authenticate("jwt",{session:false}),(req,res)=>{
    Report.findOne({_id:req.params.id}).then(report=>{
        if(!report){
            return res.status(404).json({
                code:0,
                msg:"查找失败"
            })
        }
        res.json(report)
    })
})

//添加汇报
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const newreport = {}
    newreport.username = req.body.username
    newreport.status = req.body.status
    newreport.reason = req.body.reason

    new Report(newreport).save().then(report => {
        // res.json(report)
        res.json({
            code:1,
            msg:"添加成功"
        })
    })
})


module.exports = router
