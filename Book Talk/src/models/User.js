const {Schema,model} = require('mongoose')


const userSchema = new Schema({
    username:{type: String, required: true, minLength: [4, 'Usrname should be al least 4 characters long']},
    email :{type: String, required: true, minLength: [10, 'Email should be al least 10 characters long'], unique:true},
    hashedPassword : {type: String, required: true}
})


const User = model('User', userSchema);


module.exports = User