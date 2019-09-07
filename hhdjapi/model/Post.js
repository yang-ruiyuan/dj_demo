// 党员互动model创建
const mongoose = require('mongoose')
let Schema = mongoose.Schema

let PostSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    follow:{
        type:Number,
        required:true
    },
    add_time:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Post',PostSchema)