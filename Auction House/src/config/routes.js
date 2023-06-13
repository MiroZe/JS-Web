const auctionController = require("../controllers/auctionController")
const authController = require("../controllers/authController")
const homeController = require('../controllers/homeController')

module.exports = routesConfig = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController)
    app.use('/auction', auctionController)

    app.get('*', (req,res)=> {
        res.render('404')
    })
}
