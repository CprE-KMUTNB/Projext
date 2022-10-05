const express = require("express")
const router = express.Router()
const {create} = require("../controller/loginController")

router.post('/login',create)

module.exports = router