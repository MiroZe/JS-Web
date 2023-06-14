
const Photo = require('../models/Photo')



exports.getAll = () => {
    return Photo.find()
}

exports.createPhoto = (data) => {
    return Photo.create(data)
}


exports.getOnePhoto = (photoId) => {
    return Photo.findById(photoId)
}

exports.postComment = async (photoId, comment, userId) => {

    const photo =  await Photo.findById(photoId).populate('commentList')
   
      photo.commentList.push({userId,comment})
       return  await photo.save()
     
    
    
}

exports.updatePhoto = (id,data) => Photo.findByIdAndUpdate(id,data, {runValidators:true})
exports.deletePhoto =(id) => Photo.findByIdAndDelete(id)