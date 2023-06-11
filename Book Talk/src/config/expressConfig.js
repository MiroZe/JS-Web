const express = require('express');
const { trimBody } = require('../middlewares/trimBody');
const cookieParser = require('cookie-parser');
const { isAuth } = require('../middlewares/hasUser');


module.exports = expressConfig = (app) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('src/public'));
    app.use(cookieParser())
    app.use(trimBody)
    app.use(isAuth)


}