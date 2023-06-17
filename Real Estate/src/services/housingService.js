const Housing = require("../models/Housing");


exports.createOffer = (houseData) => Housing.create(houseData)
exports.getAllOffers = () => Housing.find({});
exports.getOneHouse = (houseId) => Housing.findById(houseId)
exports.rent = (houseId, userId) => Housing.findByIdAndUpdate(houseId, {$push: {rented: userId}})
exports.updateHouse = (houseId, houseData) => Housing.findByIdAndUpdate(houseId, houseData, {runValidators:true})
exports.deleteOffer = (houseId) => Housing.findByIdAndDelete(houseId)
exports.findByType = (typeQuery) => Housing.find().where({type : {$regex : new RegExp(typeQuery,'i')}})