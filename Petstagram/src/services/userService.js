const User = require('../models/User')
const bcrypt = require('bcrypt')

const { jwtSign } = require('../utils/jwt')
const {JWT_SECRET} = require('../utils/const')



async function register (username,email, password) {
const existing = await User.findOne({username}).collation({locale :'en', strength: 2})
if(existing) {
    throw new Error ('Username is already exist')
}
const hashedPassword = await bcrypt.hash(password, 7)

const user = await User.create( {
 username,
 email,
 password: hashedPassword
})

return createSession(user)

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

function createSession ({_id, username,email}) {
const payload = {
    _id,
    username,
    email
};

return token = jwtSign(payload, JWT_SECRET);

}






module.exports = {
    register,
    login,
    
}
