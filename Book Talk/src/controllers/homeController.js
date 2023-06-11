const homeController = require('express').Router();


homeController.get('/', (req,res) => {

    console.log(res.locals.user);
    res.render('home', {title: 'Home page'})
})




module.exports = homeController