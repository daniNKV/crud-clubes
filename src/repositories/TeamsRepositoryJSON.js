const fs = require('fs');
const Team = require('../entities/Team.js');

module.exports = class TeamsRepositoryJSON {
    constructor(path) {
        this.path = path;
    }

    getAll() {
        const data = this.readFileData();
        if (!data) throw new Error('Invalid JSON file');
        return data.map((item) => new Team(item));
    }

    getById(id) {
        const data = this.readFileData();
        const rawTeam = data.find((item) => item.id === id);
        if (!rawTeam) throw new Error('Team not found');
        return new Team(rawTeam);
    }

    add(team) {
        try {
            if (this.getById(team.id)) throw new Error('Team already exists');
        } catch {
            const data = this.readFileData();
            data.push(team);
            this.writeFileData(data);
        }
    }

    update(team) {
        const data = this.readFileData();
        const index = data.findIndex((item) => item.id === team.id);
        if (index === -1) throw new Error('Team not found');
        data[index] = team;
        this.writeFileData(data);
    }

    delete(id) {
        const data = this.readFileData();
        const index = data.findIndex((item) => item.id === id);
        if (index === -1) throw new Error('Team not found');
        this.writeFileData(data
            .slice(0, index)
            .concat(data.slice(index + 1)));
    }

    readFileData() {
        const fileData = fs.readFileSync(this.path, 'utf8');
        let data;
        try {
            data = JSON.parse(fileData);
        } catch (e) {
            throw new Error('Invalid JSON file');
        }
        return data;
    }

    writeFileData(data) {
        const fileData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.path, fileData, 'utf8');
    }
};
