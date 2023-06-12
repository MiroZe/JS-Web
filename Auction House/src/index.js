const express = require('express');
const expressConfig = require('../config/express');
const databaseConfig = require('../config/database');
const routesConfig = require('../config/routes');
const handlebarsConfig = require('./config/handlebars');








const app = express()
expressConfig(app)
handlebarsConfig(app)
await databaseConfig(app)
routesConfig(app)


app.listen(3000, ()=> console.log('Server is listening on port 3000'));




