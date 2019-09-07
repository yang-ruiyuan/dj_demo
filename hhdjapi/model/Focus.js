const mongoose = require('mongoose')
let Schame = mongoose.Schema

let foucusSchame = new Schame({
    pic: {
        type: String,
        required: true
    },
    sort: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = Focus = mongoose.model('focus', foucusSchame)