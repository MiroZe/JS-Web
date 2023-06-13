const express= require('express');

const cookieParser = require('cookie-parser');
const isAuth = require('../middlewares/session')
const trimBody = require('../middlewares/trimBody');
const { hasUser } = require('../middlewares/guard');


module.exports = (app) => {

app.use(express.static('src/static'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(isAuth)
app.use(trimBody())


}