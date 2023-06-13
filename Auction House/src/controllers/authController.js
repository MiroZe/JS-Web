const { register,login } = require('../services/userService')
const { parseError } = require('../utils/parser')

const authController = require('express').Router()



authController.get('/register', (req,res) => {
    
    res.render('register', {
        title:'Register'
    })
})

authController.post('/register', async (req,res) => {

    const {email,firstName,lastName,password,repeatPassword} = req.body
   
   try {
    if(Object.values(req.body).some(f => f == '')) {
        throw new Error('All fields are mandatory')
    }

    if(password.length < 5 ) {
        throw new Error('Password is too short')

    }
   
    if(password != repeatPassword) {
        throw new Error ('Passwords do not match!')
    }
       const token = await register(email,firstName,lastName,password)
       res.cookie('token', token);
      res.redirect('/')
   } catch (error) {
    

    
        res.render('register', {
            title:'Register Page',
            errors: parseError(error),
            body : {
                email: req.body.email,
                firstName:req.body.firstName,
                lastName:req.body.lastName,

            }

        } )
   }
})

authController.get('/login', (req,res) => {
     
    res.render('login' )
})

authController.post('/login', async (req,res) => {
   try {

    if(req.body.email == '' || req.body.password == '') {
        throw new Error('All fields are mandatory')

    }
    const token = await login(req.body.email, req.body.password)
    res.cookie('token', token)
   
    res.redirect('/')
   } catch (error) {

    const errors = parseError(error)
    res.render('login', {
        title:'Login Page',
        errors: parseError(error),
        body: {
            email: req.body.email
        }
    })
   }
})

authController.get('/logout', (req,res)=> {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = authController