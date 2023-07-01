const router = require('express').Router();

function configureTeamsRoutes(container) {
    const teamsController = container.get('teamsController');
    router.get('/', teamsController.getTeams.bind(teamsController));
    router.get('/teams', teamsController.getTeams.bind(teamsController));
    router.get('/teams/:id', teamsController.getTeam.bind(teamsController));
    router.post('/teams/delete/:id', teamsController.deleteTeam.bind(teamsController));
    return router;
}

module.exports = configureTeamsRoutes;
