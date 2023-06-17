const { register,login } = require('../services/userService')
const { parseError } = require('../utils/parser')

const userController = require('express').Router()



userController.get('/register', (req,res) => {
   
    res.render('register' )
})

userController.post('/register', async (req,res) => {
   
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
       const token = await register(req.body.name, req.body.username, req.body.password)
       res.cookie('token', token);
      res.redirect('/')
   } catch (error) {
    

    //TODO add error display to actual template from assignment
        res.render('register', {
            
            errors: parseError(error),
            

        } )
   }
})

userController.get('/login', (req,res) => {
     //TODO replace with actual view by assignment
    res.render('login')
})

userController.post('/login', async (req,res) => {
   try {
    const token = await login(req.body.username, req.body.password)
    res.cookie('token', token)
    //TODO redirect according assingnment
    res.redirect('/')
   } catch (error) {
    //TODO add error display to actual template from assignment

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