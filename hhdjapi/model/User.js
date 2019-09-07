const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MpageSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    document:{
        type:String,
        require:true
    },
    tel:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    integral:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    },
    last_time:{
        type:Date,
        default:Date.now

    }
})
const User = mongoose.model("User",MpageSchema)
module.exports = User