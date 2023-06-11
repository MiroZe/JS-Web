const { register, login } = require('../services/userServices');
const { parseErrors } = require('../utils/parseErrors')

const userController = require('express').Router();


userController.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' })
})


userController.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        if (email == '' || password == '') {
            throw new Error('All fields are mandatory');
        }
        const token = await login(email, password);
        res.cookie('token', token)
        res.redirect('/')


    } catch (error) {
        res.render('login', ({ title: 'Login Page', errors: parseErrors(error) }))
    }

})

userController.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' })
})

userController.post('/register', async (req, res) => {
    const { email, username, password, repeatPassword } = req.body


    try {
        if (password != repeatPassword) {
            throw new Error('Passwords are not equal!')
        }
        if (password < 3) {
            throw new Error('Passwords should be minimum 3 characters long!')
        }

        const token = await register(email, username, password, repeatPassword)
        res.cookie('token', token)
        res.redirect('/')

    } catch (error) {
        console.log(error);
        res.render('register',
            {
                title: 'Register Page',
                errors: parseErrors(error)
            })

    }
})

userController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
})

module.exports = userController;