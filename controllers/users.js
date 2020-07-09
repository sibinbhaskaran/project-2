const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/users.js');

//Users route

userRouter.get('/users/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    });
});

userRouter.post('/users', (req, res) => {
    
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        console.log('user is created', createdUser);
        res.redirect('/');
    });
});

module.exports = userRouter;