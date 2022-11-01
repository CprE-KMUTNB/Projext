'use strict';
const multer = require('multer');
const utf8 = require('utf8');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + utf8.decode(file.originalname));
    }
});
/*const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        } 
}*/

const upload = multer({storage: storage});

module.exports = {upload}