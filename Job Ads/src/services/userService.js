const User = require('../models/User')
const bcrypt = require('bcrypt')

const { jwtSign } = require('../utils/jwt')
const {JWT_SECRET} = require('../utils/const')


async function register (email,password,skills) {
const existing = await User.findOne({email}).collation({locale :'en', strength: 2})
if(existing) {
    throw new Error ('Email is already exist')
}
const hashedPassword = await bcrypt.hash(password, 7)

const user = await User.create( {
 email,
 password:hashedPassword,
 skills
})

return createSession(user)

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

function createSession ({_id, email}) {
const payload = {
    _id,
    email,
};

return token = jwtSign(payload, JWT_SECRET);

}






module.exports = {
    register,
    login,
    
}
