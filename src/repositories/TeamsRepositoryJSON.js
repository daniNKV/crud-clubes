const fs = require('fs');

module.exports = class TeamsRepositoryJSON {
    constructor(path) {
        this.path = path;
    }

    getAll() {
        return this.readFileData();
    }

    getById(id) {
        const data = this.readFileData();
        return data.find((item) => item.id === id);
    }

    add(team) {
        const data = this.readFileData();
        data.push(team);
        this.writeFileData(data);
    }

    update(team) {
        const data = this.readFileData();
        const index = data.findIndex((item) => item.id === team.id);
        data[index] = team;
        this.writeFileData(data);
    }

    readFileData() {
        const fileData = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(fileData);
    }

    writeFileData(data) {
        const fileData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.path, fileData, 'utf8');
    }
};
