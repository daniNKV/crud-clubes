const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const configureDI = require('./config/di.js');
const { init: initTeamsModule } = require('./module/teams/module');

const PORT = 8081;
const app = express();
const handlebars = expressHandlebars.create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'module/'));
app.use('/public', express.static('public'));

const container = configureDI();
app.use(container.get('Session'));

initTeamsModule(app, container);

app.get('/', (req, res) => { res.redirect('/teams'); });
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
