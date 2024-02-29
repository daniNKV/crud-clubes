const TeamsController = require('./controller/TeamsController');
const TeamsService = require('./service/TeamsService');
const TeamsRepository = require('./repository/TeamsRepositorySqlite');

function init(app, container) {
    const controller = container.get('teamsController');
    controller.configureRoutes(app);
}

module.exports = {
    init,
    TeamsController,
    TeamsService,
    TeamsRepository,
};
