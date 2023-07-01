const {
    default: DIContainer,
    object,
    use,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('rsdi');

const TeamsRepositoryJson = require('../repositories/TeamsRepositoryJSON.js');
const TeamServices = require('../services/TeamServices.js');
const TeamsController = require('../controllers/TeamsController.js');

function addTeamsDefinitions(container) {
    container.add({
        PATH: 'data/teams.db.json',
        teamsRepository: object(TeamsRepositoryJson).construct(use('PATH')),
        teamsServices: object(TeamServices).construct(use('teamsRepository')),
        teamsController: object(TeamsController).construct(use('teamsServices')),
    });
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addTeamsDefinitions(container);
    return container;
};
