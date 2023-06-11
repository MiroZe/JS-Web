const { ObjectId } = require('bson');
const { Schema, model, Types } = require('mongoose')

const imagePattern = /^https?:\/\/./i

const bookSchema = new Schema({
    title: { type: String, required: true, minLength: [2, 'Title should be minimum 2 characters long'] },
    author: { type: String, required: true, minLength: [5, 'Author should be minimum 5 characters long'] },
    genre: { type: String, required: true, minLength: [3, 'Genre should be minimum 3 characters long'] },
    stars: {
        type: Number, required: true,
        min: [1, 'Title should be minimum 1 characters long'],
        max: [5, 'Title should be maximum 5 characters long']
    },
    imageUrl: {type:String, 
            validate: {validator:(value)=> imagePattern.test(value),message: 'Invalid Url'}},
    review: { type: String, required: true, minLength: [10, 'Review should be minimum 10 characters long'] },
    creator: { type: Types.ObjectId, ref: 'User' },
    wishList: { type:[ Types.ObjectId], ref: 'User', default: []}
  

})



const Book = model('Book', bookSchema);

module.exports = Book;