const hbs = require('express-handlebars')
const express = require('express')


module.exports = handlebarsConfig = (app) => {

    app.engine('hbs', hbs.engine({extname:'hbs'}))
    app.set('view engine', 'hbs')
    app.set('views', 'src/views')


}