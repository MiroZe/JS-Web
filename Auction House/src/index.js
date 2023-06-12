const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes')
const handlebarsConfig = require('./config/handlebars');








const app = express();
expressConfig(app)
routesConfig(app)
databaseConfig(app)
handlebarsConfig(app)


app.listen(3000, ()=> console.log('Server is listening on port 3000'));




