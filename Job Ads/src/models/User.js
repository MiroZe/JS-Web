const {Schema,model, Types} = require('mongoose')

 const emailPattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-z]+/i

const userSchema = new Schema(
    {
    email:{type:String, required:true, validate: { validator:(value) => emailPattern.test(value), message: 'Inavild email format'  }},
    password: {type: String, required: true},
    skills: {type : String, required :true, unique:true, maxlength: [40, 'The description should be maximum 40 characters long']},
    myAds: {type: [Types.ObjectId]}
    }
)

userSchema.index({email:1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema)

module.exports = User;