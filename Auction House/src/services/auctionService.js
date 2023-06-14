const Auction = require("../models/Auction")



exports.getAll = () => {
    return Auction.find().where({closed:false})
}

exports.createPublication = async (data) => {
    return await Auction.create(data)
}


exports.getOne = (id) => {
    return Auction.findById(id)
}

exports.updateAuction =  (id, auctionData) => {
    return Auction.findByIdAndUpdate(id, auctionData, {runValidators:true})
}

exports.deleteAuction = (id) => {
    return Auction.findByIdAndDelete(id)
}

exports.myClosedAuctions = (id) => {
    return Auction.find().where({author:id}).where({closed:true})
}



