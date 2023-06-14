const { Schema, model, Types } = require('mongoose')



const photoSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'The name should be minimum 2 characters long'] },
    image: { type: String, required: true, match: [/^https?:\/\//, 'Invalid picture Url'] },
    age: { type: Number, required: true, min: [1, 'The age value shold be between 1 an 100'], max: [100, 'The age value shold be between 1 an 100'] },
    description: {
        type: String, required: true, minlength: [5, 'The description should be between 5 an 50 characters'],
        maxLength: [50, 'The description should be between 5 an 50 characters']
    },
    location: {
        type: String, required: true, minlength: [5, 'The location should be between 5 an 50 characters'],
        maxLength: [50, 'The location should be between 5 an 50 characters']
    },
    commentList: [
        {
            userId: { type: Types.ObjectId, ref: 'User' },
            comment: { type: String, required: true }
        }
    ],
    owner: { type: Types.ObjectId, ref: 'User' },

})


const Photo = model('Photo', photoSchema);



module.exports = Photo;