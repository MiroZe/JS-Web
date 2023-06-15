const {Schema,model, Types} = require('mongoose')



const cryptoSchema = new Schema( {

    name:{ type: String, required: true, minLength: [2, 'The name should be 2 characters at least']},
    image:{ type: String, required: true, match : [/^https?:\/\//, 'Inavalid image Url']},
    price:{ type: Number, required: true, min: [1, 'The price should be positive integer']},
    description:{ type: String, required: true, minLength: [10, 'The description should be 10 characters at least']},
    paymentMethod: {type: String, enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'], required:true},
    buyers: {type : [Types.ObjectId], ref:'User'},
    owner: {type : Types.ObjectId, ref:'User'},


})


const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto