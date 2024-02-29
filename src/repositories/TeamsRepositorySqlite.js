const Team = require('../entities/Team');
const AbstractTeamRepository = require('./AbstractTeamRepository');

module.exports = class TeamRepositorySqlite extends AbstractTeamRepository {
    constructor(database) {
        super();
        this.database = database;
    }

    getAll() {
        try {
            const teams = this.database.prepare(`SELECT
            id,
            area,
            name,
            short_name,
            tla,
            crest_url,
            address,
            phone
            website,
            email,
            founded,
            club_colors
            venue,
            last_updated 
            FROM teams`).all();
            return teams.map((team) => new Team(team));
        } catch {
            return [];
        }
    }

    getById(id) {
        try {
            const team = this.database.prepare(`SELECT
            id,
            area,
            name,
            short_name,
            tla,
            crest_url,
            address,
            phone
            website,
            email,
            founded,
            club_colors
            venue,
            last_updated
            FROM teams WHERE id = ?`).get(id);

            return team;
        } catch {
            return null;
        }
    }

    save(team) {
        let id;
        const params = [
            team.area,
            team.name,
            team.shortName,
            team.tla,
            team.crestUrl,
            team.address,
            team.phone,
            team.website,
            team.email,
            team.founded,
            team.clubColors,
            team.venue,
            team.lastUpdated,
        ];

        if (id) {
            id = this.#create(params);
        } else {
            id = this.#update(params);
        }

        return this.getById(id);
    }

    #update(team) {
        const statement = this.db.prepare(
            `UPDATE teams SET
                crest_url = ${team.crestUrl ? 'crest_url = ?,' : ''}
                name = ?
                short_name = ?
                tla = ?
                address = ?
                phone = ?
                website = ?
                email = ?
                founded = ?
                club_colors = ?
                venue = ?
                last_updated = ?
                WHERE id = ?`,
        );

        const result = statement.run(
            team.crestUrl,
            team.name,
            team.shortName,
            team.tla,
            team.address,
            team.phone,
            team.website,
            team.email,
            team.founded,
            team.clubColors,
            team.venue,
            team.lastUpdated,
            team.id,
        );

        return result.lastInsertedRowid;
    }

    #create(team) {
        const statement = this.db.prepare(
            `INSERT INTO teams (
            area,
            name,
            short_name,
            tla,
            crest_url,
            address,
            phone,
            website,
            email,
            founded,
            club_colors,
            venue,
            last_updated
            ) VALUES ( ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        );

        const result = statement.run(
            team.area,
            team.name,
            team.shortName,
            team.tla,
            team.crestUrl,
            team.address,
            team.phone,
            team.website,
            team.email,
            team.founded,
            team.clubColors,
            team.venue,
            team.lastUpdated,
        );

        return result.lastInsertedRowid;
    }

    delete(team) {
        this.database.prepare('DELETE FROM teams WHERE id = ?').run(team.id);
    }
};
