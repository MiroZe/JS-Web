const {Schema,model} = require('mongoose')


//TODO add user properties and validation acc assingnment
const userSchema = new Schema({
    username: {type : String, required :true, unique:true, minlength: [5, 'Username should be minimum 5 characters long']},
    email:{type:String, required:true, minlength:[10, 'Email format is wrong']},
    password: {type: String, required: true}
})

userSchema.index({username:1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema)

module.exports = User;