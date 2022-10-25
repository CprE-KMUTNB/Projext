const express = require("express")
const { getDATA, testDelete } = require("../controller/downloadControll")
const router = express.Router()
const {create,mydata, getAlldata, createspace, testgetAlldata, getsingleDATA, editname} = require("../controller/registerController")
const {singlecreate,getSingleShare,checkshare} = require("../controller/sharefileController")

router.post('/register',create)
router.get('/getalldata',getAlldata)
router.get('/datauser/:slug',mydata)
router.get('/testdownload',getDATA)
router.delete('/testdelete',testDelete)
router.get('/getsingledata',getsingleDATA)
router.put('/editname',editname)

router.post('/createspace',createspace)

router.get('/singlesharecreate',singlecreate)
router.get('/singleshare',getSingleShare)
router.get('/checkshare',checkshare)
module.exports = router