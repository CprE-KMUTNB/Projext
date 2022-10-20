const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const testRoute = require('./route/test')
const authRoute = require('./route/auth')

const app = express()

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
app.use('/api',authRoute)

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(port))

'use strict';
const path = require('path');
const bodyParser = require('body-parser');
const fileRoutes = require('./route/file-upload-routes');
require("dotenv").config()
app.use(cors());


app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'assets')));

app.use('/api', fileRoutes.routes);