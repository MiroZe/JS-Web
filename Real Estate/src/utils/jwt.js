const jwt = require('jsonwebtoken')





exports.jwtSign = (payload, secret) => {
    const promise = new Promise((resolve,reject)=> {
        jwt.sign(payload, secret, function (error,token){
            if(error){
                reject(error)
            } else {
                resolve(token)
            }
        })
    })

    return promise;
}

exports.jwtVerify = (token,secret) => {
    const promise = new Promise((resolve,reject)=> {
        jwt.verify(token,secret, function ( error, decodedToken) {
            if(error){
                reject(error)
            } else {
                resolve(decodedToken)
            }
        })
    })
    return promise;

}