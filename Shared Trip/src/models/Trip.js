const {Schema,model,Types} = require('mongoose')


const tripSchema = new Schema( {
    startPoint: {type: String, minlength:[4, 'Start point should be 4 characters at least']},
    endPoint: {type: String, minLength:[4, 'End point should be 4 characters at least']},
    date: {type: String, required: [true, 'Date field is mandatory']},
    time: {type: String, required: [true, 'Time field is mandatory']},
    carImage: {type: String, match: [/^https?:\/\//, 'Image URL is not valid'], required:true},
    carBrand: {type: String, minLength:[4, 'Car brand should be 4 characters at least']},
    seats: {type: Number, required: [true, 'Seats field is mandatory']},
    price: {type: Number, min: [1, 'Minimal price is 1 BGN'], max: [50, 'Maximum price is 50 BGN ']},
    description: {type: String, minLength:[10, 'Description  should be 10 characters at least']},
    creator: { type: Types.ObjectId, ref: 'User', required: true}, 
    buddies: {type: [Types.ObjectId], ref:'User'}
})


const Trip = model('Trip', tripSchema);


module.exports = Trip;