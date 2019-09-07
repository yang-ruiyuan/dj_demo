let express = require("express");
let router = express.Router();
let news = require("../../model/New")
let passport = require('passport')

let multer = require("multer"); //文件上传

//文件上传
//配置
let storage = multer.diskStorage({
    //文件保存路径
    destination: function(req,file,cb){
        cb(null,'public/upload/news');
    },

    //修改文件名称
    filename:function(req,file,cb){
        let fileFormat = (file.originalname).split(".");    //以点进行分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);   //对文件从新进行命名 时间加文件后缀
    }
})

//加载文件上传配置
let upload = multer({storage:storage})


//添加新闻
router.post("/add",upload.single("file") ,passport.authenticate("jwt", { session: false }),(req,res)=>{
    let newsFields= {}
    newsFields.title  = req.body.title ;
    newsFields.autor  = req.body.autor ;
    newsFields.description  = req.body.description ;
    newsFields.pic  = req.file ? req.file.path.substr(7) : ""; ;
    newsFields.content  = req.body.content ;
    newsFields.keywords  = req.body.keywords ;
    newsFields.type = req.body.type;
    newsFields.articlecate  = req.body.articlecate ;

    new news(newsFields)
    .save()
    .then(user=>res.json({
        code:1,
        message:'添加成功'
    }))
})

//修改新闻
router.post("/edit",upload.single("file") ,passport.authenticate("jwt", { session: false }),(req,res)=>{
    let newsFields= {}
    let id = req.body._id;
    newsFields.title  = req.body.title ;
    newsFields.autor  = req.body.autor ;
    newsFields.description  = req.body.description ;
    newsFields.pic  = req.file ? req.file.path.substr(7) : ""; ;
    newsFields.content  = req.body.content ;
    newsFields.keywords  = req.body.keywords ;
    newsFields.type = req.body.type;
    newsFields.articlecate  = req.body.articlecate ;

    news.findOneAndUpdate({"_id":id},{$set:newsFields},{new:true}).then(news=>{
        res.json({
            code:1,
            message:'添加成功'
        })
    })
})

// 获取所有的新闻数据
router.get("/list",passport.authenticate("jwt", { session: false }),(req,res)=>{
    news.find().then(news=>{
        if(!news){
            return res.status(404).json("没有任何内容")
        }
        res.json(news)
    })
})

// 根据id获取新闻数据
router.get("/list/:id",passport.authenticate("jwt", { session: false }),(req,res)=>{
    news.findOne({_id:req.params.id}).then(news=>{
        if(!news){
            return res.status(404).json("没有任何内容")
        }
        rres.json({
            code:1,
            message:'更新成功'
        })
    })
})

// 删除一条数据
router.get("/delete/:id",passport.authenticate("jwt", { session: false }), (req,res)=>{
    news.findOneAndDelete({_id:req.params.id}).then(news=>{
        res.json({
            code:1,
            message:'删除成功'
        })
    })
})

//批量删除数据
router.get("/remove",passport.authenticate("jwt", { session: false }), (req,res)=>{
    
    let ids = req.query.ids;
    
    let arr = [];
    for(let i=0;i<ids.length;i++){
        let  result = news.findOneAndDelete({_id:ids[i]})
        arr.push(result);
    }

    Promise.all(arr).then(news=>{
        res.json({
            code:1,
            message:'删除成功'})
        }).catch(err=>
            res.json({
                code:0,
                message:'部分删除成功'
            })
        )
})

module.exports = router;