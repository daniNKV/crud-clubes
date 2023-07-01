module.exports = class TeamController {
    constructor(teamsServices) {
        this.teamsServices = teamsServices;
    }

    async getTeams(req, res) {
        const teams = await this.teamsServices.getAll();
        res.render('teams', {
            layout: 'base',
            teams,
        });
    }

    async getTeam(req, res) {
        const { id } = req.params;
        const team = await this.teamsServices.getById(id);
        res.render('team', {
            layout: 'base',
            team,
        });
    }

    async saveTeam(req, res) {
        const team = req.body;
        await this.teamsServices.add(team);
        res.redirect('/teams');
    }

    async deleteTeam(req, res) {
        const { id } = req.params;
        await this.teamsServices.delete(id);
        res.redirect('/teams');
    }
};
