const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const configureDI = require('./config/di.js');
const configureTeamsRoutes = require('./routes/teams.js');

const PORT = 8081;
const app = express();
const handlebars = expressHandlebars.create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/'));
app.set('defaultLayout', 'base');
app.use('/public', express.static('public'));

const container = configureDI();
const router = configureTeamsRoutes(container);

app.use(container.get('Session'));
app.use('/', router);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
