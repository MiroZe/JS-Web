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

exports.deleteBook = (bookId) => Book.findByIdAndDelete(bookId)