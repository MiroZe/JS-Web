const userController = require("../controllers/userController")
const homeController = require('../controllers/homeController')
const artController = require("../controllers/artController")

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', userController)
    app.use('/art', artController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
