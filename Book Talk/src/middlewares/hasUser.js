const { JWT_SECRET } = require("../utils/consts");
const { jwtVerify } = require("../utils/jwt");
const cookieParser = require('cookie-parser');


exports.hasUser = (req,res,next) => {
    if(req.user) {
        next()
    } else {
        return res.redirect('/auth/login')
    }
};


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