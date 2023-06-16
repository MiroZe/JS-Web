exports.hasUser = (req,res,next) => {
    if(req.user) {
        next()
    } else {
        return res.redirect('/auth/login')
    }
};


exports.alreadyLogged = (req,res,next) => {
    if(!req.user) {
        next()
    } else {
        return res.redirect('/')
    }
};
