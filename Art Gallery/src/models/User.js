const {Schema,model, Types} = require('mongoose')


//TODO add user properties and validation acc assingnment
const userSchema = new Schema({
    username: {type : String, required :true, unique:true, minlength: [4, 'Username should be minimum 4 characters long']},
    password: {type: String, required: true},
    address:{type:String, required:true, maxLength: [20, 'The address should be maximum 20 characters']},
    myPublications: {type: [Types.ObjectId], ref: 'Publication'}
})



const User = model('User', userSchema)

module.exports = User;