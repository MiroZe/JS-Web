const {Schema,model, Types} = require('mongoose')


const emailPattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-z]+/i


const userSchema = new Schema({
    email: {type : String,
         required :true, 
         unique:true,
          validate: {validator:(value)=> emailPattern.test(value),message: 'Invalid email address'} },
    password: {type: String, required: true},
    gender:{type:String, required:true},
    history : {type:[Types.ObjectId], ref:'Trip'}
})



const User = model('User', userSchema)

module.exports = User;