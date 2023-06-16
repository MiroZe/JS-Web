const { getThreePositions } = require('../services/jobService');

const homeController = require('express').Router();




homeController.get('/', async (req,res) => {

 
const allPositions = await getThreePositions().lean()
console.log(allPositions);
   
    res.render('home', {allPositions})
});

module.exports = homeController