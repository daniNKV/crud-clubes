/* eslint-disable class-methods-use-this */
module.exports = class AbstractTeamRepository {
    constructor() {
        if (new.target === AbstractTeamRepository) {
            throw new Error('Abstract class cannot be instantiated');
        }
    }

    getAll() {
        throw new Error('Method not implemented');
    }

    getById() {
        throw new Error('Method not implemented');
    }

    save() {
        throw new Error('Method not implemented');
    }

    delete() {
        throw new Error('Method not implemented');
    }
};
