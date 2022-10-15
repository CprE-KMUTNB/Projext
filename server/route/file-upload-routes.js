'use strict';
const {upload} = require('../helpers/filehelpers');
const express = require('express');
const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles, deletefile
      } = require('../controller/fileuploadercontroller');
const router = express.Router();

router.post('/singleFile',upload.single('file'), singleFileUpload);
/*router.post('/multipleFiles', upload.array('files'), multipleFileUpload);*/
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);
router.delete('/delete', deletefile);


module.exports = {
    routes: router
}