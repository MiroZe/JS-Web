const userController = require("../controllers/userController")
const homeController = require('../controllers/homeController')
const jobController = require("../controllers/jobController")

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', userController)
    app.use('/job', jobController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
