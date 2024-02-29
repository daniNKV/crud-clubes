module.exports = class TeamsController {
    constructor(teamsServices, uploadMiddleware) {
        this.teamsServices = teamsServices;
        this.uploadMiddleware = uploadMiddleware;
        this.BASE_PATH = '/teams';
    }

    configureRoutes(app) {
        const ROUTE = this.BASE_PATH;
        app.get(`${ROUTE}`, this.getTeams.bind(this));
        app.get(`${ROUTE}/:id`, this.getTeam.bind(this));
        app.get(`${ROUTE}/edit/:id`, this.editTeam.bind(this));
        app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-file'), this.saveTeam.bind(this));
        app.post(`${ROUTE}/delete/:id`, this.deleteTeam.bind(this));
    }

    async getTeams(req, res) {
        const teams = await this.teamsServices.getAll();
        const { messages } = req.session;
        res.render('teams/view/teams', {
            layout: 'base',
            teams,
            messages,
        });
        req.session.messages = [];
    }

    async getTeam(req, res) {
        const { id } = req.params;
        const team = await this.teamsServices.getById(Number(id));
        res.render('teams/view/team', {
            layout: 'base',
            team,
        });
    }

    async editTeam(req, res) {
        const { id } = req.params;
        if (Number(id) === -1) {
            res.render('teams/view/form', { layout: 'base' });
        } else {
            const team = await this.teamsServices.getById(Number(id));
            res.render('teams/view/form', {
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
            req.session.messages = ['Team updated successfully'];
        } else {
            await this.teamsServices.create(team);
            req.session.messages = ['Team created successfully'];
        }
        res.redirect('/teams');
    }

    async deleteTeam(req, res) {
        const { id } = req.params;
        await this.teamsServices.delete(Number(id));
        res.redirect('/teams');
    }
};
