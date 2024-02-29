module.exports = class TeamServices {
    constructor(repository) {
        this.repository = repository;
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }

    create(team) {
        return this.repository.add(team);
    }

    update(team) {
        return this.repository.update(team);
    }

    delete(id) {
        return this.repository.delete(id);
    }
};
