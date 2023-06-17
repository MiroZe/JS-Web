const homeController = require('express').Router();


//TODO replace real controller by assignment

homeController.get('/', (req,res) => {
   
    res.render('home')
});

module.exports = homeController