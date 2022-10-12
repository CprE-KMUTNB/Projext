const mongoose = require("mongoose")

const userSpace = mongoose.Schema({
    ID:{
        type:String,
        require:true,
        unique:true
    },
    UserData : {
        type:String,
        default : ""
    }

},{timestamps:true})

module.exports = mongoose.model("UserSpace",userSpace)