const mongoose = require("mongoose")

const singleshare = mongoose.Schema({
    owner:{
        type:String,
        default : "",
    },
    FileName : {
        type:String,
        default : ""
    },
    FilePath : {
        type:String,
        default : ""
    },
    Type : {
        type:String,
        default : ""
    },
    Slug : {
        type:String,
        default : ""
    },
    ShareTo :{
        type:String,
        default : ""
    },
    Links : {
        type:String
    }

    
    

},{timestamps:true})

module.exports = mongoose.model("SingleShare",singleshare)