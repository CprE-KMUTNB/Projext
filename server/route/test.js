const express = require("express")
const router = express.Router()
const {create,getAlldata,mydata} = require("../controller/registerController")

router.post('/register',create)
router.get('/datauser',getAlldata)
router.get('/datauser/:slug',mydata)

module.exports = router