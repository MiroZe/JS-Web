const userController = require("../controllers/userController")
const homeController = require('../controllers/homeController')
const tripController = require("../controllers/tripController")

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', userController)
    app.use('/trips', tripController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
