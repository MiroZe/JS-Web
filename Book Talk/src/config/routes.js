const bookController = require("../controllers/bookController");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");



module.exports = routesConfig = (app) => {
    app.use('/', homeController);
    app.use('/auth', userController);
    app.use('/books', bookController)



    app.get('*', (req,res)=> {
        res.render('404')
    })
}