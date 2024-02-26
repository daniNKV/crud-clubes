const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const multer = require('multer');
const configureDI = require('./config/di.js');
const configureTeamsRoutes = require('./routes/teams.js');

const upload = multer({ dest: 'uploads/' });
const PORT = 8081;
const app = express();
const handlebars = expressHandlebars.create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/'));
app.set('defaultLayout', 'base');

const container = configureDI();
const router = configureTeamsRoutes(container, upload);

app.use('/', router);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
