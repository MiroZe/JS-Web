const userController = require("../controllers/userController")
const homeController = require('../controllers/homeController')
const photoController = require("../controllers/photoController")

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', userController)
    app.use('/photos', photoController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
