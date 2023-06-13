const {Schema,model, Types} = require('mongoose')



const auctionSchema = new Schema ({
    title : {type: String, required:true, minLength: [4, 'Title should be 4 characters ate least']},
    description : {type: String,required:true,  minLength: [200, 'Description should be 200 characters ate least']},
    category : {type: String,required:true, enum: ['Vehicles','Real Estate','Electronics','Furniture', 'Other']},
    imageUrl : {type: String,required:true,},
    price : {type: Number,required:true, min: [0, 'Price should be positive number']},
    author : {type: Types.ObjectId, ref: 'User', required:true},
    bidder: {type:Types.ObjectId, ref:'User' }
})



const Auction = model('Auction', auctionSchema);


module.exports = Auction
