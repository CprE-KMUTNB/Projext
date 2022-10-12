'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://127.0.0.1/uploadfile', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to Mongodb......'));
}