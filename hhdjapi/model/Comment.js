const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    description:{
        type:String,
        default:'这是描述'
    },
    status:{
        type:Number,
        required:true
    },
    content: {
        type:String
    },
    add_time:{
        type:Date,
        default:Date.now
    }
})

module.exports = Comment = mongoose.model('comment', CommentSchema)