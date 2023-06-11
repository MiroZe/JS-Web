const bcrypt = require('bcrypt')
const { jwtSign } = require('../utils/jwt')
const User = require('../models/User')
const { JWT_SECRET } = require('../utils/consts')


async function register(email,username,password,repeatPassword) {

const existUser = await User.findOne({email}).collation({locale:'en', strength: 2})
if(existUser) {
    throw new Error ('This email is already reagistered')
}

const hashedPassword = await bcrypt.hash(password,7)
const user = await User.create({email,username,hashedPassword})
const payload = {
    _id:user._id,
    email:user.email,
    username: user.username
}

return jwtSign(payload, JWT_SECRET)

}

async function login(email, password) {

   
        const existUser = await User.findOne({email}).collation({locale:'en', strength: 2})
        
        if(!existUser) {
            throw new Error ('Cannot find username or password')
        
        }

        const passwordCheck = await bcrypt.compare(password,existUser.hashedPassword)
        if(!passwordCheck) {
            throw new Error('Cannot find username or password')
        }
        const payload = {
            _id:existUser._id,
            email:existUser.email,
            username: existUser.username
        }
        
        return jwtSign(payload,JWT_SECRET)


}








module.exports = {
    register,
    login
}