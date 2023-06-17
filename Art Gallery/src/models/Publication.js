const {Schema,model, Types} = require('mongoose')



const publicationsSchema = new Schema( {

title: {type: String, required: true, minLength: [6, 'Title should be 6 characters long']},
technique: {type: String, required: true, maxLength: [15, 'Technique should be 15 characters long']},
picture: {type: String, required: true, match: [/^https?.\/\//, 'Invalid picture Url']},
certificate: {type:String, required: true, enum: ['Yes', 'No']},
author: {type: Types.ObjectId, ref: 'User', required:true},
shared : {type: [Types.ObjectId], ref: 'User'}

});

const Publication = model('Publication', publicationsSchema);



module.exports = Publication;