const {Schema,model} = require('mongoose')


//TODO add user properties and validation acc assingnment
const userSchema = new Schema({
    name:{type:String, required:true, match: [/[A-Z][a-z]+ [A-Z][a-z]/, 'Incorect name format!']},
    username: {type : String, required :true, minlength: [5, 'Username should be minimum 5 characters long']},
    password: {type: String, required: true}
})



const User = model('User', userSchema)

module.exports = User;