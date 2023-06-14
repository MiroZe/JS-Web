const { register,login } = require('../services/userService')
const { parseError } = require('../utils/parser')

const userController = require('express').Router()



userController.get('/register', (req,res) => {
   
    res.render('register', {
        title:'Register'
    })
})

userController.post('/register', async (req,res) => {

  
   
   try {
    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are required')
    }
    if(req.body.password.length < 4) {
        throw new Error ('Password is too short!')
    }
    if(req.body.password != req.body.repeatPassword) {
        throw new Error ('Passwords do not match!')
    }
       const token = await register(req.body.username, req.body.email, req.body.password)
       res.cookie('token', token);
      res.redirect('/')
   } catch (error) {
    

   
        res.render('register', {
            title:'Register Page',
            errors : parseError(error),
            body : {
                username: req.body.username,
                email: req.body.email,
            }

        } )
   }
})

userController.get('/login', (req,res) => {
     //TODO replace with actual view by assignment
    res.render('login', {
        title:'Login Page'
    })
})

userController.post('/login', async (req,res) => {
   try {
    const token = await login(req.body.username, req.body.password)
    res.cookie('token', token)
   
    res.redirect('/')
   } catch (error) {
   

    const errors = parseError(error)
    res.render('login', {
        title:'Login Page',
        errors:parseError(error),
        body: {
            username: req.body.username
        }
    })
   }
})

userController.get('/logout', (req,res)=> {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = userController