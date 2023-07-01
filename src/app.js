// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const routes = require('./routes');
const configureDependencyInjection = require('./config/di');

const PORT = 8081;
const app = express();
const handlebars = expressHandlebars.create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/'));

const container = configureDependencyInjection();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use('/', routes);
