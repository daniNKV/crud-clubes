const {
    default: DIContainer, object, use, factory,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('rsdi');

const TeamsRepositoryJson = require('../repositories/TeamsRepositoryJSON');
const TeamServices = require('../services/TeamServices');

function addTeamsDefinitions(container) {
    container.add({
        PATH: '../data/teams.db.json',
        repository: object(TeamsRepositoryJson).construct(use('PATH')),
        teamServices: object(TeamServices).construct(use('repository')),
    });
}

module.exports = function configureDI() {
    const container = new DIContainer();
    addTeamsDefinitions(container);
    return container;
};
