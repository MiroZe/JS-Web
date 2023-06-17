const { hasUser } = require('../middlewares/guard');
const { createOffer, getAllOffers, getOneHouse, rent, updateHouse, deleteOffer, findByType } = require('../services/housingService');
const { parseError } = require('../utils/parser');

const housingController = require('express').Router();


housingController.get('/create', hasUser, (req,res) => {

    res.render('create')
} )

housingController.post('/create', hasUser, async(req,res) => {

    const homeData = {
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        image:req.body.image,
        description: req.body.description,
        available: Number(req.body.available),
        owner: req.user._id
    }

    try {
        if(Object.values(homeData).some(f => f == '')) {
            throw new Error('All fields are required')
        }
        await createOffer(homeData)
        res.redirect('/house/catalog')
    } catch (error) {
        res.render('create', {homeData, errors: parseError(error)})
    }

} )

housingController.get('/catalog', async(req,res) => {

    try {
        const allOffers = await getAllOffers().lean()
        res.render('catalog', {allOffers})
    } catch (error) {
        res.render('catalog', {errors:parseError(error)})
        
    }
})

housingController.get('/:houseId/details', async(req,res) => {

    try {
        const house = await getOneHouse(req.params.houseId).populate('rented').lean();
        const isOwner = house.owner._id == req.user?._id;
        const isAvailablePieces = (house.available - house.rented.length) > 0
        const freePieces = house.available - house.rented.length;
        const isUserRented = house.rented.some(u => u._id == req.user?._id)
        const rentedUsersArray = [];
        house.rented.map(u => rentedUsersArray.push(u.name));
        const rentedUsers = rentedUsersArray.join(', ')
       
        

        res.render('details', {house,isOwner,isAvailablePieces, freePieces, isUserRented, rentedUsers})
    } catch (error) {
        res.render('details', {errors:parseError(error)})
        
    }

})

housingController.get('/:houseId/rent', hasUser, async (req,res) => {

    try {
        await rent(req.params.houseId, req.user._id);
        res.redirect(`/house/${req.params.houseId}/details`)
    } catch (error) {
        res.render('404', {errors: parseError(error)})
    }
    
})

housingController.get('/:houseId/edit', hasUser, async(req,res)=> {

    try {
        const house = await getOneHouse(req.params.houseId).lean();
        res.render('edit', {house})
    } catch (error) {
        res.render('edit', {errors: parseError(error)})
    }
})

housingController.post('/:houseId/edit', hasUser, async(req,res) => {

    const houseData = {
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        image:req.body.image,
        description: req.body.description,
        available: Number(req.body.available),
        
    }

try {
    if(Object.values(houseData).some(f => f == '')) {
        throw new Error('All fields are required')
    }
    await updateHouse(req.params.houseId, houseData);
    res.redirect(`/house/${req.params.houseId}/details`)
} catch (error) {
    res.render('edit', {errors: parseError(error), house: houseData})
}

})


housingController.get('/:houseId/delete', hasUser, async(req,res)=> {

    try {
        await deleteOffer( req.params.houseId)
        res.redirect('house/catalog')
    } catch (error) {
        console.log(error);
        res.render('404', {errors:parseError(error)})
    }
})
housingController.get('/search', hasUser, (req,res) => {
    res.render('search')
})

housingController.post('/search', hasUser, async(req,res) => {
    const typeQuery = req.body.typeQuery

    try {
        const founded = await  findByType(typeQuery).lean();
       
        res.render('search', {founded, typeQuery})
        
    } catch (error) {
        res.render('search', {errors:parseError(error)})
    }

})

module.exports = housingController