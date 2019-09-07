const express = require("express")
const Summary = require("../../model/Summary")
const passport = require("passport")  //验证token

const router = express.Router();

// 如果没有带token去访问 默认返回Unauthorized
// 带上token去访问  

// 获取所有的汇报列表 
router.get("/list", passport.authenticate("jwt",{session:false}),(req,res)=>{
    Summary.find().then(summarys=>{
        if(!summarys){
            return res.status(404).json({
                code:0,
                msg:"查找失败"
            })
        }
        res.json(summarys)
    })
})


//添加汇报
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const newsummary = {}
    newsummary.username = req.body.username
    newsummary.status = req.body.status
    newsummary.reason = req.body.reason

    new Summary(newsummary).save().then(summary => {
        // res.json(report)
        res.json({
            code:1,
            msg:"添加成功"
        })
    })
})


module.exports = router
