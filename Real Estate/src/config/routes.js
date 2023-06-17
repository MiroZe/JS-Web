const userController = require("../controllers/userController")
const homeController = require('../controllers/homeController')
const housingController = require("../controllers/housingController")

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', userController)
    app.use('/house', housingController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
