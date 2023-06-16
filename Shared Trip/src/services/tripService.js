const Trip = require('../models/Trip');



exports.createTrip = (tripData) => Trip.create(tripData)
exports.getAllTrips = () => Trip.find();
exports.getOneTrip = (id) => Trip.findById(id);
exports.joinToTrip = (tripId,userId) => Trip.findByIdAndUpdate(tripId, {$push: {buddies: userId}})
exports.updateTrip = (id, data) => Trip.findByIdAndUpdate(id,data, {runValidators:true});
exports.deleteTrip = (id) => Trip.findByIdAndDelete(id)




