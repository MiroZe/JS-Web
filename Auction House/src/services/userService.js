const User = require('../models/User')
const bcrypt = require('bcrypt')
const {JWT_SECRET} = require('../utils/const')

const { jwtSign } = require('../utils/jwt')


async function register (email,firstName,lastName,password) {
const existing = await User.findOne({email}).collation({locale :'en', strength: 2})
if(existing) {
    throw new Error ('Email is already exist')
}
const hashedPassword = await bcrypt.hash(password, 7)

const user = await User.create( {
 email,
 password: hashedPassword,
 firstName,
 lastName
})

return createSession(user)


//TODO see assignment if registration creates user session
}

async function login (email, password) {
    const user = await User.findOne({email})
                .collation({locale:'en', strength:2})
    if(!user) {
        throw new Error('Username doesnt exist or password is incorrect')
    }

    const passwordCheck  = await bcrypt.compare(password,user.password)
    if(!passwordCheck) {
        throw new Error('Username doesnt exist or password is incorrect')
    }
    return token = createSession(user)

}

function createSession ({_id, email,firstName,lastName}) {
const payload = {
    _id,
    email,
    firstName,
    lastName
};

return token = jwtSign(payload, JWT_SECRET);

}


function findUser (userId) {
    return User.findById(userId)
}






module.exports = {
    register,
    login,
    findUser
    
}
