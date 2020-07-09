const express = require('express');
const router = express.Router();

const Store = require('../models/store.js');


//___________________
// Routes
//___________________
//localhost:3000
//index 
router.get('/' , (req, res) => {
    Store.find({}, (error, allitems) =>{


        res.render('index.ejs',{
            
            store: allitems
    
            })
        })
    
    })


//new

router.get('/new/', (req,res) =>{

res.render('new.ejs');


})

//post

router.post('/', (req,res) =>{

    Store.create(req.body, (error,newItem) =>{

        res.redirect('/');
    })
})

//edit
router.get('/:id/edit/', (req,res) =>{

Store.findById(req.params.id,(error,foundItem) =>{


    res.render('edit.ejs', {

        store:foundItem,
    })
})

})


//update
router.put('/:id', (req,res) =>{

Store.findByIdAndUpdate(req.params.id, req.body,{useFindAndModify: false}, (error,updateItem) =>{

    res.redirect('/' + updateItem.id);
})

})










//show

router.get('/:id', (req,res) =>{


    Store.findById(req.params.id, (error, foundItem) =>{
    
    res.render('show.ejs',{

    store: foundItem
            })
        })
    
    })

//Destroy
router.delete('/:id', (req,res) =>{


    Store.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (error,deleteItem) =>{

        res.redirect('/');
    })
})


module.exports = router;