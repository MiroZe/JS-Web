const {Schema,model, Types} = require('mongoose')



const housingSchema = new Schema( {

name : {type: String, required:true, minLength: [6, 'Name should be 6 characters at least']},
type: {type: String, required:true, enum: ['Apartment', 'Villa','House' ]},
year : {type: Number, required:true, min:[1850, 'Year shoulbe between 1850 and 2021'],max:[2021, 'Year shoulbe between 1850 and 2021']},
city : {type: String, required:true, minLength: [4, 'City should be 4 characters at least']},
image : {type: String, required:true, match: [/^https?:\/\//, 'Invalid picture Url']},
description : {type: String, required:true, maxLength: [60, 'Description should be maximum 50 characters ']},
available : {type: Number, required:true, min: [0, 'Available should be in the range between 0 and 10'], max: [10, 'Available should be in the range between 0 and 10']},
rented : {type: [Types.ObjectId], ref:'User'},
owner: {type: Types.ObjectId, ref: 'User', required:true}



})

const Housing = model('Housing', housingSchema)


module.exports = Housing