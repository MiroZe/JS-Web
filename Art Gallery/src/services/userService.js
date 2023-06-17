const User = require('../models/User')
const bcrypt = require('bcrypt')

const { jwtSign } = require('../utils/jwt')
const {JWT_SECRET} = require('../utils/const')


async function register (username,password,address) {
const existing = await User.findOne({username}).collation({locale :'en', strength: 2})
if(existing) {
    throw new Error ('Username is already exist')
}
const hashedPassword = await bcrypt.hash(password, 7)

const user = await User.create( {
 username,
 password:hashedPassword,
 address
})

return createSession(user)


//TODO see assignment if registration creates user session
}

async function login (username, password) {
    const user = await User.findOne({username})
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

function createSession ({_id, username,address}) {
const payload = {
    _id,
    username,
    address
};

return token = jwtSign(payload, JWT_SECRET);

}






module.exports = {
    register,
    login,
    
}
