const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const PORT = 8081;
const app = express();
const handlebars = expressHandlebars.create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
