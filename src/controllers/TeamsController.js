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
        const team = await this.teamsServices.getById(Number(id));
        res.render('team', {
            layout: 'base',
            team,
        });
    }

    async editTeam(req, res) {
        const { id } = req.params;
        let team;
        if (id === -1) {
            team = await this.teamsServices.getById(Number(id));
            res.render('form', {
                layout: 'base',
                team,
            });
        } else {
            res.render('form', {
                layout: 'base',
            });
        }
    }

    async addTeam(req, res) {
        const team = req.body;
        await this.teamsServices.create(team);
        res.redirect('/teams');
    }

    async updateTeam(req, res) {
        const team = req.body;
        await this.teamsServices.update(team);
        res.redirect('/teams');
    }

    async deleteTeam(req, res) {
        const { id } = req.params;
        await this.teamsServices.delete(Number(id));
        res.redirect('/teams');
    }
};
