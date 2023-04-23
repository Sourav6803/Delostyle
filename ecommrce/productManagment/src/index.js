const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
// const dotenv = require('dotenv').config();
const AWS = require('aws-sdk')
const  mongoose = require('mongoose');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors())


const multer= require("multer");
const { AppConfig } = require('aws-sdk');


app.use(bodyParser.urlencoded({ extended: true }));
app.use( multer().any())

mongoose.connect("mongodb+srv://snehal_3497:snehal_3497@atlascluster.q9xoryr.mongodb.net/group09Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
}) 
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});