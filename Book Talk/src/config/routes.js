const homeController = require("../controllers/homeController")



module.exports = routesConfig = (app) => {
    app.use('/', homeController)


    app.get('*', (req,res)=> {
        res.render('404')
    })
}