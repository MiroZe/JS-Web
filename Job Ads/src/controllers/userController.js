const userController = require('express').Router();
const { alreadyLogged } = require('../middlewares/guard');
const { register,login } = require('../services/userService');
const { parseError } = require('../utils/parser');




userController.get('/register', alreadyLogged, (req,res) => {
    
    res.render('register', {
        title:'Register'
    })
})

userController.post('/register',alreadyLogged, async (req,res) => {
   
   try {
    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are required')
    }
    if(req.password < 5) {
        throw new Error( 'Password should be 4 characters at least ')
    }
    if(req.body.password != req.body.repeatPassword) {
        throw new Error ('Passwords do not match!')
    }
       const token = await register(req.body.email, req.body.password,req.body.skills)
       res.cookie('token', token);
      res.redirect('/')
   } catch (error) {
    
        res.render('register', {
            title:'Register Page',
            errors: parseError(error),
            body : {
                username: req.body.username,
                email:req.body.email
            }

        } )
   }
})

userController.get('/login', alreadyLogged,(req,res) => {
   
    res.render('login', {
        title:'Login Page'
    })
})

userController.post('/login',alreadyLogged, async (req,res) => {
   try {
    const token = await login(req.body.email, req.body.password)
    res.cookie('token', token)
    res.redirect('/')
   } catch (error) {
  

    res.render('login', {
       
        errors: parseError(error),
      
    })
   }
})

userController.get('/logout', (req,res)=> {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = userController