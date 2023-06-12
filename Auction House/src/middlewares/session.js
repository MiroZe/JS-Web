const { JWT_SECRET } = require("../utils/const")
const { jwtVerify } = require("../utils/jwt")


exports.isAuth = async (req,res,next) => {
    

    const token = req.cookies.token
    if(token) {
        try {
            const decodedToken = await jwtVerify(token, JWT_SECRET)
            req.user = decodedToken
            res.locals.user = decodedToken
            
        } catch (error) {
            res.clearCookie('token');
            res.redirect('/auth/login')
        }
      
       
    }
    next()

}