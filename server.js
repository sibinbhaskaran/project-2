//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const session = require('express-session');
const bcrypt = require('bcrypt');
//
const axios = require('axios').default;   // axios dependecy
//


const PORT = process.env.PORT || 3000;


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/storedb'   

// Connect to Mongo
mongoose.connect(mongoURI  ,  { useNewUrlParser: true, useUnifiedTopology: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI ));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(methodOverride('_method'));

app.use(
    session({
      secret: process.env.SECRET, 
      resave: false, 
      saveUninitialized: false
    })
)

// calling models data
const Store = require('./models/store.js');


  

//store controller
const storeController = require('./controllers/store.js');
app.use('/', storeController);


//User controller
const userController = require('./controllers/users.js');
app.use('/users',userController);

//session controller

const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);


// usedcars controller api
const usedController = require('./controllers/usedcar.js');
app.use('/cars/', usedController);


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));