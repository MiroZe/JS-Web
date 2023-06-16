const User = require('../models/User')
const bcrypt = require('bcrypt')

const { jwtSign } = require('../utils/jwt')
const {JWT_SECRET} = require('../utils/const')


async function register (email,password,gender) {
const existing = await User.findOne({email}).collation({locale :'en', strength: 2})
if(existing) {
    throw new Error ('Email is already registered')
}
const hashedPassword = await bcrypt.hash(password, 7)

const user = await User.create( {
 email,
 password:hashedPassword,
 gender
})

return createSession(user)


}

async function login (email, password) {
    const user = await User.findOne({email})
                .collation({locale:'en', strength:2})
    if(!user) {
        throw new Error('Email doesnt exist or password is incorrect')
    }

    const passwordCheck  = await bcrypt.compare(password,user.password)
    if(!passwordCheck) {
        throw new Error('Email doesnt exist or password is incorrect')
    }
    return token = createSession(user)

}

function createSession ({_id, email,gender}) {
const payload = {
    _id,
    email,
    gender
};

return token = jwtSign(payload, JWT_SECRET);

}


function updateMyTrips  (userId,tripId) {
  return   User.findByIdAndUpdate(userId, {$push: {history: tripId}})
}

function getMyData(id) {
    return User.findById(id)
}



module.exports = {
    register,
    login,
    updateMyTrips,
    getMyData
}
