const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const testRoute = require('./route/test')

const app = express()
//conect
mongoose.connect(process.env.DATABASE
    ,{
        useNewUrlParser:true,
        useUnifiedTopology:false
    })
    .then(()=>console.log("conection complete"))
    .catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api',testRoute)

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(port))