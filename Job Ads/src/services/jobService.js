const Ad = require('../models/Ad')


exports.createOpenPosition = (jobData) => {

    return  Ad.create(jobData)
  
  }

exports.getallOpenedPositions = () => Ad.find()
exports.getOneOpenedPosition = (jobId) => Ad.findById(jobId)
exports.applyForJob = (jobId, userId) => Ad.findByIdAndUpdate(jobId, {$push: {appliedUsers: userId}})
exports.getThreePositions = () => Ad.find().limit(3)
exports.deletePosition = (id) => Ad.findByIdAndDelete(id)
exports.editPosition = (id, data) => Ad.findByIdAndUpdate(id,data, {runValidators:true})
