const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    ID:{
        type:String,
        required: true
    },
    UserDataName: {
        type: String,
        required: true
    },
    UserDataPath: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('userspace', singleFileSchema);