const { hasUser } = require('../middlewares/guard');
const { createCrypto, getAllCrypto, getOneCrypto, buyCrypto, deleteCrypto, updateCrypto, search } = require('../services/cryptoServices');
const { parseError, generateOptions } = require('../utils/parser');

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

cryptoController.get('/:cryptoId/edit', hasUser, async(req,res)=> {
    try {
        const oneCrypto = await getOneCrypto(req.params.cryptoId).lean()
        const options = generateOptions(oneCrypto.paymentMethod)
        console.log(options);
        console.log(oneCrypto.paymentMethod);

        res.render('edit', {oneCrypto, options})
    } catch (error) {
        res.render('edit', {errors: parseError(error)})
    }
})


cryptoController.post('/:cryptoId/edit', hasUser, async(req,res)=> {

    const data = {
        name: req.body.name,
        image: req.body.image,
        price: Number(req.body.price),
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        
    }

    try {
        if(Object.values(data).some(f => f== '')) {
            throw new Error( 'All fields are mandatory')
        }
        console.log(data.paymentMethod);

        await updateCrypto(req.params.cryptoId, data)
        res.redirect(`/crypto/${req.params.cryptoId}/details`)
    } catch (error) {
        const options = generateOptions(data.paymentMethod)
        res.render('edit', {options, oneCrypto: data, errors: parseError(error)})
    }
})

cryptoController.get('/search', hasUser, async (req, res)=> {
   
    try {
        const foundMatches = await getAllCrypto().lean()

      
        res.render('search', {foundMatches})
    } catch (error) {
        res.render('search', {errors:parseError(error)})
    }


})

cryptoController.post('/search', hasUser, async (req,res)=> {
    const nameQuery = req.body.name
   
    
    const paymentMethod = req.body.paymentMethod
    

try {
    const foundMatches = await search(nameQuery,paymentMethod).lean();
    
    res.render('search',{foundMatches} )
} catch (error) {
    res.render('search', {nameQuery,errors:parseError(error)})
}
})


module.exports = cryptoController