const {Schema,model} = require('mongoose')


//TODO add user properties and validation acc assingnment
const userSchema = new Schema({
    email: {type : String, required :true, unique:true, minlength: [3, 'Username should be minimum 3 characters long']},
    hashedPassword: {type: String, required: true},
    firstName: {type: String, required: true},
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