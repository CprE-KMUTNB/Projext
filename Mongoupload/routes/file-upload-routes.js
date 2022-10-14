'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelpers');
const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles, deletefile
      } = require('../controllers/fileuploadercontroller');
const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);
router.delete('/delete', deletefile);


module.exports = {
    routes: router
}