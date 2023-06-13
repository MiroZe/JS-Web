const Auction = require("../models/Auction")



exports.getAll = () => {
    return Auction.find()
}

exports.createPublication = async (data) => {
    return await Auction.create(data)
}


exports.getOne = (id) => {
    return Auction.findById(id)
}

exports.updateAuction = async (id, auctionData) => {
    return Auction.findByIdAndUpdate(id, auctionData, {runValidators:true})
}