//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

require('dotenv').config()


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/storedb'

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

const Store = require('./models/store.js');


//___________________
// Routes
//___________________
//localhost:3000
//index 
app.get('/' , (req, res) => {
    Store.find({}, (error, allitems) =>{


        res.render('index.ejs',{
            
            store: allitems
    
            })
        })
    
    })


//new

app.get('/new/', (req,res) =>{

res.render('new.ejs');


})

//post

app.post('/', (req,res) =>{

    Store.create(req.body, (error,newItem) =>{

        res.redirect('/');
    })
})

//edit
app.get('/:id/edit/', (req,res) =>{

Store.findById(req.params.id,(error,foundItem) =>{


    res.render('edit.ejs', {

        store:foundItem,
    })
})

})


//update
app.put('/:id', (req,res) =>{

Store.findByIdAndUpdate(req.params.id, req.body, (error,updateItem) =>{

    res.redirect('/' + updateItem.id);
})

})










//show

app.get('/:id', (req,res) =>{


    Store.findById(req.params.id, (error, foundItem) =>{
    
    res.render('show.ejs',{

    store: foundItem
            })
        })
    
    })

//Destroy
app.delete('/:id', (req,res) =>{


    Store.findByIdAndRemove(req.params.id,(error,deleteItem) =>{

        res.redirect('/');
    })
})








//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));