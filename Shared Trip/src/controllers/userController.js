const { alreadyLogged, hasUser } = require('../middlewares/guard')
const { register,login, getMyData } = require('../services/userService')
const { parseError } = require('../utils/parser')

const userController = require('express').Router()



userController.get('/register', alreadyLogged, (req,res) => {
   
    res.render('register' )
})

userController.post('/register',alreadyLogged, async (req,res) => {

    console.log(req.body);
   
   try {
    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are required')
    }
    if(req.password < 4) {
        throw new Error( 'Password should be 4 characters at least ')
    }
    if(req.body.password != req.body.repeatPassword) {
        throw new Error ('Passwords do not match!')
    }
       const token = await register(req.body.email, req.body.password, req.body.gender)
       res.cookie('token', token);
      res.redirect('/')
   } catch (error) {
    

        res.render('register', {
            
            errors: parseError(error),

        } )
   }
})

userController.get('/login',alreadyLogged, (req,res) => {
     //TODO replace with actual view by assignment
    res.render('login')
})

userController.post('/login',alreadyLogged, async (req,res) => {
   try {
    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are required')
    }

    const token = await login(req.body.email, req.body.password)
    res.cookie('token', token)
   
    res.redirect('/')
   } catch (error) {
 

    res.render('login', {
       
        errors: parseError(error),
        
    })
   }
})

userController.get('/profile', hasUser, async (req,res) => {

try {
    const profileData = await getMyData(req.user._id).populate('history').lean()
    const isMale = profileData.gender == 'male'
    
    res.render('profile', {profileData, isMale})
} catch (error) {
    
}

})

userController.get('/logout', (req,res)=> {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = userController