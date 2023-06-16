const {Schema,model,Types} = require('mongoose')




const adSchema = new Schema({

    headline: {type:String, required: true, minLength: [4, 'Headline should be 4 characters at least']},
    location: {type:String, required: true, minLength: [8, 'Location should be 8 characters at least']},
    companyName: {type:String, required: true, minLength: [3, 'Company Name should be 3 characters at least']},
    companyDescription: {type:String, required: true, maxlength: [40, 'Description should be maximum 40 characters']},
    author: {type:Types.ObjectId, required: true, ref: 'User'},
    appliedUsers: {type:[Types.ObjectId], ref:'User'}


})


const Ad = model('Ad', adSchema);


module.exports = Ad
