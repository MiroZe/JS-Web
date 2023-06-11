const express = require('express');
const expressConfig = require('./config/expressConfig')
const databaseConfig = require('./config/databaseConfig')
const handlebarsConfig = require('./config/handlebarsConfig');
const routesConfig = require('./config/routes');

const cookieParser = require('cookie-parser');
const { trimBody } = require('./middlewares/trimBody');
const { isAuth } = require('./middlewares/hasUser');


const app = express();


expressConfig(app)
routesConfig(app)
databaseConfig()
handlebarsConfig(app)




app.listen(3000, ()=> console.log('Server is listening on port 3000'))