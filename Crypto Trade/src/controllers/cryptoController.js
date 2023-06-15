const { hasUser } = require('../middlewares/guard');
const { createCrypto, getAllCrypto, getOneCrypto, buyCrypto, deleteCrypto } = require('../services/cryptoServices');
const { parseError } = require('../utils/parser');

const cryptoController = require('express').Router();


cryptoController.get('/create', hasUser, (req, res) => {

    res.render('create')
})

cryptoController.post('/create', hasUser, async (req, res) => {

    const data = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        owner: req.user._id
    }

    try {
        if(Object.values(data).some(f => f== '')) {
            throw new Error( 'All fields are mandatory')
        }
        await createCrypto(data)
        res.redirect('/crypto/catalog')
    } catch (error) {
        res.render('create', {errors: parseError(error), data})
    }

})

cryptoController.get('/catalog', async (req, res) => {

    const allCrypto = await getAllCrypto().lean()

    res.render('catalog', {allCrypto})
})

cryptoController.get('/:cryptoId/details', async (req, res) => {

    try {

        const oneCrypto = await getOneCrypto(req.params.cryptoId).populate('buyers').lean()
        const isOwner = req.user?._id == oneCrypto.owner._id
        const isAlredyBuyer = oneCrypto.buyers.some(r => r._id == req.user?._id)
        
        res.render('details', {oneCrypto, isOwner, isAlredyBuyer})
        
    } catch (error) {
        res.render('details', {errors: parseError(error)})
        
    }
})

cryptoController.get('/:crytoId/buy', hasUser, async(req,res)=> {
   
    try {
        await buyCrypto(req.params.crytoId, req.user._id)
        res.redirect(`/crypto/${req.params.crytoId}/details`)
    } catch (error) {
        res.render('details', {errors: parseError(error)})
    }
})

cryptoController.get('/:cryptoId/delete', hasUser, async(req,res)=> {
    try {
        await deleteCrypto(req.params.cryptoId)
        res.redirect('/crypto/catalog')
    } catch (error) {
        res.render('details', {errors: parseError(error)})
    }
})



module.exports = cryptoController