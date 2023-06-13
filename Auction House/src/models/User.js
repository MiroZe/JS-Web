const {Schema,model} = require('mongoose')

const emailPattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-z]+/i
//TODO add user properties and validation acc assingnment
const userSchema = new Schema({
    email: {type : String, 
        required :true, 
        unique:true,
        validate: {validator:(value)=> emailPattern.test(value),message: 'Invalid email address'} },
    password: {type: String, required: true},
    firstName: {type: String, required: true,},
    lastName: {type: String, required: true},

})

userSchema.index({email:1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema)

module.exports = User;