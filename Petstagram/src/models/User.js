const {Schema,model} = require('mongoose')


//TODO add user properties and validation acc assingnment
const userSchema = new Schema({
    username: {type : String, required :true, unique:true, minlength: [2, 'Username should be minimum 2 characters long']},
    email:{type:String, required:true, minlength:[10, 'Email should be minimum 10 characters long']},
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