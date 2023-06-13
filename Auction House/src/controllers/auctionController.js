const auctionController = require('express').Router();



auctionController.get('/catalog', (req,res) => {

    res.render('auction/catalog')
})


module.exports = auctionController