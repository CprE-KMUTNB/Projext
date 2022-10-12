const express = require("express")
const { getDATA } = require("../controller/downloadControll")
const router = express.Router()
const {create,getAlldata,mydata} = require("../controller/registerController")

router.post('/register',create)
router.get('/datauser',getAlldata)
router.get('/datauser/:slug',mydata)
router.get('/testdownload',getDATA)

module.exports = router