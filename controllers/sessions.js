const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const sessionRouter = express.Router();

sessionRouter.get('/sessions/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    });
});

sessionRouter.post('/sessions/', (req, res) => {
    
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (!foundUser) {
            
            res.send('<a href="/">User not found</a>');
        } else {
         
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                
                res.send('<a href="/">Incorrect password.</a>');
            }
        }
    });
});

sessionRouter.delete('/sessions', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = sessionRouter;