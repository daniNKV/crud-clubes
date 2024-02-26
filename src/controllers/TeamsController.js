module.exports = class TeamController {
    constructor(teamsServices, uploadMiddleware) {
        this.teamsServices = teamsServices;
        this.uploadMiddleware = uploadMiddleware;
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
        if (Number(id) === -1) res.render('form', { layout: 'base' });
        else {
            const team = await this.teamsServices.getById(Number(id));
            res.render('form', {
                layout: 'base',
                team,
            });
        }
    }

    async saveTeam(req, res) {
        const team = req.body;
        if (req.file) {
            const { path } = req.file;
            team.crestUrl = path;
        }

        if (team.id) {
            await this.teamsServices.update(team);
        } else {
            await this.teamsServices.create(team);
        }
        res.redirect('/teams');
    }

    async deleteTeam(req, res) {
        const { id } = req.params;
        await this.teamsServices.delete(Number(id));
        res.redirect('/teams');
    }
};
