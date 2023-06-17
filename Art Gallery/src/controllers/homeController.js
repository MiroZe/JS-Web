const { getAllArts } = require('../services/artService');
const { parseError } = require('../utils/parser');

const homeController = require('express').Router();




homeController.get('/', async (req,res) => {


    try {
        
        const allArts = await getAllArts().lean()
        res.render('home', {allArts})
    } catch (error) {
        res.render('home', {errors: parseError(error)})
        
    }
});



module.exports = homeController