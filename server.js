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

//

app.get('/usedcars/', (req,res)=>{
  usedcarfunc(77001,50,res);
 
})

app.post('/usedcars/',(req,res) =>{
// console.log(req.body);
usedcarfunc(req.body.zip,req.body.radius,res);
  
// res.redirect('/usedcars')

})

const usedcarfunc = (zip,radius,res) =>{
// console.log(zip,radius)
  let usedCar = { headers: { 
            'Host': 'marketcheck-prod.apigee.net'
          },
        params: {
          api_key: 'LJMroK3X9tLuyH5I9rAqmsULpnNqOyaP',
          zip: zip,
          radius: radius,
          car_type: 'used',
          start: 0,
          rows: 40,
          sort_order: 'asc',
    
    
        }
      }
    
    axios.get('http://api.marketcheck.com/v2/search/car/active?',usedCar)    // calling used car api
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      
     
     
      res.render('usedcars.ejs',{
    
        usedCarValue: response.data.listings
      
      })
    
    
    
    })
    .catch(function (error) {
        console.log(error);
      });

}

  ///

//store controller
const storeController = require('./controllers/store.js');
app.use('/', storeController);


//User controller
const userController = require('./controllers/users.js');
app.use('/users',userController);

//session controller

const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

//usedcars controller
// const usedController = require('./controllers/usedcar.js');
// app.use(usedController);

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));