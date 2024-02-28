require('dotenv').config();
const cookieSession = require('cookie-session');
const {
    default: DIContainer,
    object,
    use,
    factory,
} = require('rsdi');
const path = require('path');
const multer = require('multer');
const TeamsRepositoryJson = require('../repositories/TeamsRepositoryJSON.js');
const TeamServices = require('../services/TeamServices.js');
const TeamsController = require('../controllers/TeamsController.js');

function configureMulter() {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/img/crests');
        },
        filename(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    return multer({ storage });
}

function configureJSONDatabase() {
    return process.env.JSON_DB_PATH;
}

function configureSession() {
    return cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
    });
}

function addCommonDefinitions(container) {
    container.add({
        JSONDatabase: factory(configureJSONDatabase),
        Multer: factory(configureMulter),
        Session: factory(configureSession),
    });
}

function addTeamsDefinitions(container) {
    container.add({
        teamsRepository: object(TeamsRepositoryJson).construct(use('JSONDatabase')),
        teamsServices: object(TeamServices).construct(use('teamsRepository')),
        teamsController: object(TeamsController).construct(
            use('teamsServices'),
            use('Multer'),
        ),
    });
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addCommonDefinitions(container);
    addTeamsDefinitions(container);
    return container;
};
