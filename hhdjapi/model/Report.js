const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ReportSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    add_time:{
        type:Date,
        default:Date.now
    },
    reason:{
        type:String,
        required:true
    },

})
module.exports = Report = mongoose.model("report",ReportSchema)