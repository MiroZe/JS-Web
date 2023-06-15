const userController = require("../controllers/userController")
const homeController = require('../controllers/homeController')
const cryptoController = require("../controllers/cryptoController")

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', userController)
    app.use('/crypto', cryptoController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
