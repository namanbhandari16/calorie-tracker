const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const users= require('./routes/userRoutes')
const record = require('./routes/recordRoutes')
//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err)); 

app.use('/api/users',users)
app.use('/api',record)
const PORT = process.env.PORT || 5000
app.listen(PORT)