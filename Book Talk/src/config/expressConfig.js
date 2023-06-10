const express = require('express');


module.exports = expressConfig = (app) => {
    app.use(express.urlencoded({extended:true}))
    app.use(express.static('src/public'))
    app.use(express.static('src/public'))
}