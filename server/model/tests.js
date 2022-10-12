const mongoose = require("mongoose")

const registerData = mongoose.Schema({
    ID:{
        type:String,
        require:true,
        unique:true
    },
    PASSWORD:{
        type:String,
        require:true
    },
    CONFIRM_PASSWORD:{
        type:String,
        require:true
    },
    NAME:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("registerDATA",registerData)