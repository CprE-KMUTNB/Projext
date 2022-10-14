const express = require("express")
const { getDATA } = require("../controller/downloadControll")
const router = express.Router()
const {create,mydata, getAlldata, createspace} = require("../controller/registerController")

router.post('/register',create)
router.get('/getalldata',getAlldata)
router.get('/datauser/:slug',mydata)
router.get('/testdownload',getDATA)

router.post('/createspace',createspace)
module.exports = router