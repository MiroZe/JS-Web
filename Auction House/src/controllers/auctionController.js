const { getAll, createPublication, getOne, updateAuction, deleteAuction, bid} = require('../services/auctionService');
const { parseError, generateOptions } = require('../utils/parser');
const {hasUser} = require('../middlewares/guard')
const {options} = require('../utils/const');
const { findUser } = require('../services/userService');


const auctionController = require('express').Router();



auctionController.get('/catalog', async(req,res)=> {


try {
     const allPublications = await getAll().lean()
     res.render('auction/catalog', {allPublications})
    
} catch (error) {
    res.render('auction/catalog', {errors: parseError(error)})
}

})

auctionController.get('/create', hasUser,(req,res) => {

    try {
        res.render('auction/create')
    } catch (error) {
        res.render('auction/create', {errors: parseError(error)})
    }

})
auctionController.post('/create', hasUser, async (req,res) => {

  
    const auctionData = {
        title: req.body.title,
        category: options[req.body.category],
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        description: req.body.description,
        author: req.user._id
    }

    

try {
   

    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are mandatory')
    }
    await createPublication(auctionData)
    res.redirect('/auction/catalog')
    
} catch (error) {

    res.render('auction/create', {errors: parseError(error), auctionData}) 
    
}

})

auctionController.get('/:auctionId/details',async (req,res) => {

    
    const auction = await getOne(req.params.auctionId).populate('author').lean();

    try {
        
    
        
        if(req.user) {

           
            if(req.user._id == auction.author?._id) {
                auction.isAuthor = true;
                if(auction.bidder?._id) {

                    const currentWinner = await findUser(auction.bidder._id)
                    auction.bidderNames = `${currentWinner.firstName} ${currentWinner.lastName}`
                }
                
            } else if(auction.bidder?._id != req.user._id) {
                auction.currentWinner = true;
                
            } else if (auction.bidder?._id == req.user._id) {
                auction.currentWinner = false;
            }
        }
        auction.fullName = `${auction.author.firstName} ${auction.author.lastName}`
        res.render('auction/details', {auction})
    } catch (error) {
        res.render('auction/details', {errors: parseError(error)})
    }


})

auctionController.get('/:auctionId/edit' , hasUser, async (req,res) => {

    try {
        const auction = await getOne(req.params.auctionId).lean()
        

        if(req.user._id != auction.author._id){
            res.redirect('/auth/login')
        }
        const result = generateOptions(auction.category)

       res.render('auction/edit', {auction,result})
        
    } catch (error) {
        res.render('auction/edit', {errors: parseError(error)})
    }

})

auctionController.post('/:auctionId/edit' , hasUser, async (req,res) =>{


        const auctionData = {
            title: req.body.title,
            category: options[req.body.category],
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
            description: req.body.description,
            author: req.user._id
        }

        try {
            await updateAuction(req.params.auctionId, auctionData)
            res.redirect(`/auction/${req.params.auctionId}/details`)
        } catch (error) {
            res.render('auction/edit', {errors: parseError(error), auctionData})
        }
    

})

auctionController.get('/:auctionId/delete', hasUser, async (req,res)=> {

    try {
        await deleteAuction(req.params.auctionId);
        res.redirect('/auction/catalog')
        
    } catch (error) {
        res.render('404', {errors: parseError(eror)})
    }
     
})

auctionController.post('/:auctionId/details', hasUser, async(req,res) => {

    const userId = req.user._id
    const price = Number(req.body.bid)
    const auction = await getOne(req.params.auctionId).lean()
    try {
        if(auction.author._id == userId) {
            throw new Error('You can bid on your own offer!')
        }
        
        if(auction.price >= price) {
            throw new Error('Price should be greater than offer price')
        }
        auction.price = price
        auction.bidder = req.user._id
        await updateAuction(req.params.auctionId,auction)
        res.redirect(`/auction/${req.params.auctionId}/details`)

    } catch (error) {
        res.render('auction/details', {errors:parseError(error), auction})
    }
    


})


   
    



module.exports = auctionController