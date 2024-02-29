require('dotenv').config();
const SqliteDatabase = require('better-sqlite3');
const cookieSession = require('cookie-session');
const {
    default: DIContainer,
    object,
    use,
    factory,
} = require('rsdi');
const path = require('path');
const multer = require('multer');
const { TeamsController, TeamsService, TeamsRepository } = require('../module/teams/module');

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

function configureMainDatabase() {
    const db = new SqliteDatabase(
        process.env.SQLITE_DB_PATH,
        { verbose: console.log },
    );
    return db;
}

function configureSession() {
    return cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
    });
}

function addCommonDefinitions(container) {
    container.add({
        MainDatabase: factory(configureMainDatabase),
        Multer: factory(configureMulter),
        Session: factory(configureSession),
    });
}

function addTeamsDefinitions(container) {
    container.add({
        teamsRepository: object(TeamsRepository).construct(use('MainDatabase')),
        teamsServices: object(TeamsService).construct(use('teamsRepository')),
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
