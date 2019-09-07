const express = require('express')
const Focus = require('../../model/Focus')
const multer = require("multer")
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'public/upload/focus');
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".")
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + fileFormat[fileFormat.length - 1]);
    }
});
//加载配置
var upload = multer({
    storage: storage
});


//  获取轮播图列表数据接口
router.get('/list', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Focus.find({}).then(ref => {
        res.json(ref)
    })
})


// 添加轮播图数据接口
router.post('/add', passport.authenticate('jwt', {
    session: false
}), upload.single('pic'), (req, res) => {
    let pic = req.file ? req.file.path.substr(7) : ""
    let sort = req.body.sort
    let status = req.body.status
    let title = req.body.title.trim()
    let url = req.body.url
    if (pic) {
        var json = {
            pic,
            sort,
            status,
            title,
            url
        }
    } else {
        sort,
            status,
            title,
            url
    }
    Focus.insertMany(json).then(ref => {
        if (!ref) {
            return res.status(404).json('添加失败！')
        } else {
            res.json({
                code: 1,
                msg: "添加成功!"
            })
        }
    })
})


// 查找轮播图接口
router.get('/edit/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Focus.findOne({
        _id: req.params.id
    }).then(ref => {
        res.json(ref)
    })
})

// 确认编辑轮播图接口
router.post('/edit', passport.authenticate('jwt', { session: false }), upload.single('pic'), (req, res) => {
    let pic = req.file ? req.file.path.substr(7) : ""
    let sort = req.body.sort
    let status = req.body.status
    let title = req.body.title.trim()
    let url = req.body.url
    if (pic) {
        var json = {
            pic,
            sort,
            status,
            title,
            url
        }
    } else {
        sort,
            status,
            title,
            url
    }
    Focus.update({
        _id: req.body.id
    }, json).then(ref => {
        if (!ref) {
            return res.status(404).json('编辑失败！')
        } else {
            res.json({
                code: 1,
                msg: "编辑成功!"
            })
        }
    })
})



module.exports = router