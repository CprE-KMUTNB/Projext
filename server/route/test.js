const express = require("express")
const { getDATA, testDelete } = require("../controller/downloadControll")
const router = express.Router()
const {create,mydata, getAlldata, createspace, testgetAlldata} = require("../controller/registerController")

router.post('/register',create)
router.get('/getalldata',getAlldata)
router.get('/datauser/:slug',mydata)
router.get('/testdownload',getDATA)
router.delete('/testdelete',testDelete)

router.post('/createspace',createspace)
module.exports = router