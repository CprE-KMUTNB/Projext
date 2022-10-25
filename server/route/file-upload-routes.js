'use strict';
const {upload} = require('../helpers/filehelpers');
const express = require('express');
const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles,
      } = require('../controller/fileuploadercontroller');
const router = express.Router();

router.post('/singleFile',upload.single('file'), singleFileUpload);
/*router.post('/multipleFiles', upload.array('files'), multipleFileUpload);*/
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}