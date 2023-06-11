const Book = require("../models/Book");



exports.getAll = () => Book.find({})

exports.createBook = (bookData) => {

  return  Book.create(bookData)

}

exports.getOneBook = (bookId) => {
    return Book.findById(bookId)
}

exports.editBook = (bookData, bookId, ) => {
    

    return Book.findByIdAndUpdate(bookId,bookData, {runValidators:true})
}

exports.deleteBook = (bookId, userId) => Book.findByIdAndDelete(bookId);
exports.wishBook = (bookId,userId) => Book.findByIdAndUpdate(bookId, {$push :{wishList:userId}})

exports.getMyWishedBooks = (userId) => {
  return Book.find({wishList : userId})
}