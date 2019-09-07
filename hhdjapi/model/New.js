const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let newSchema = new Schema({
    title :{
        type:String,
        required:true
    },
    autor :{
        type:String,
        required:true
    },
    description :{
        type:String,
    },
    type  :{
        type:String,
        required:true
    },
    pic  :{
        type:String,
        // required:true
    },
    content  :{
        type:String,
        required:true
    },
    add_time :{
        type:Date,
        default:Date.now
    },
    keywords  :{
        type:String,
    },
    articlecate  :{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("News",newSchema,"news")