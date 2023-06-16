const { hasUser } = require('../middlewares/guard');
const { createTrip, getAllTrips, getOneTrip, joinToTrip, updateTrip, deleteTrip } = require('../services/tripService');
const { updateMyTrips } = require('../services/userService');
const { parseError } = require('../utils/parser');

const tripController = require('express').Router();



tripController.get('/create', hasUser, (req,res)=> {

    res.render('create')
})

tripController.post('/create', hasUser, async (req,res)=> {

    const tripData = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date:req.body.date,
        time:req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        creator: req.user._id
    }

    try {
        if(Object.values(tripData).some(f => f == '')) {
            throw new Error('All fields are mandatory')
        }

       const newTrip = await createTrip(tripData);
     
       await updateMyTrips(req.user._id, newTrip._id )
       res.redirect('/trips/catalog')
        
    } catch (error) {
        
        res.render('create', {errors: parseError(error), tripData})
    }

})

tripController.get('/catalog', async (req,res)=> {

    try {
        const allTrips = await getAllTrips().lean()
        res.render('catalog', {allTrips})
      
    } catch (error) {
        res.render('catalog', {errors:parseError(error)})
    }


})

tripController.get('/:tripId/details', async (req,res)=> {

try {

    const trip = await getOneTrip(req.params.tripId).populate('buddies').populate('creator').lean();
    const isCreator = trip.creator._id == req.user?._id
    const freeSeats = trip.seats - Number(trip.buddies.length)
    const isNotFull = freeSeats > 0
    const isUserAlreadyJoined = !(trip.buddies.some(u => u._id == req.user?._id)) 
    const passengersArray = []
    trip.buddies.map( r => passengersArray.push(r.email))
    
    const passengers = passengersArray.join(', ')

   

   
    res.render('details', {trip,isCreator,freeSeats,isUserAlreadyJoined,isNotFull, passengers})


    
} catch (error) {
    res.render('details', {errors:parseError(error)})
    
}

})

tripController.get('/:tripId/join', hasUser, async(req,res) => {

    try {
        const userId = req.user._id;
        const tripId = req.params.tripId
        await joinToTrip(tripId,userId)
        res.redirect(`/trips/${tripId}/details`)
        
    } catch (error) {
        res.render('details' , {errors:parseError(error)})
    }
})

tripController.get('/:tripId/edit' , hasUser, async(req,res) => {
        try {
            const trip = await getOneTrip(req.params.tripId).lean()
            console.log(trip);
            res.render('edit', {trip})
        } catch (error) {
            res.render('edit', {trip, errors: parseError(error)})
        }

})

tripController.post('/:tripId/edit' , hasUser, async(req,res)=> {
    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date:req.body.date,
        time:req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
      
    }

    try {
        await updateTrip(req.params.tripId, trip)
        res.redirect(`/trips/${req.params.tripId}/details`)


    } catch (error) {
        res.render('create', {trip, errors:parseError(error)})
    }

})

tripController.get('/:tripId/delete' , hasUser, async(req,res) => {

try {
    await deleteTrip(req.params.tripId)
    res.redirect('/trips/catalog')
} catch (error) {
    res.redirect('trips/catalog', {errors: parseError(error)})
}

})



module.exports = tripController;