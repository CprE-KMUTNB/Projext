const mongoose = require("mongoose")

const userSpace = mongoose.Schema({
    ID:{
        type:String,
        require:true,
        unique:false
    },
    UserDataName : {
        type:String,
        default : ""
    },
    UserDataPath : {
        type:String,
        default : ""
    },
    Type : {
        type:String,
        default : ""
    }
    

},{timestamps:true})

module.exports = mongoose.model("UserSpace",userSpace)