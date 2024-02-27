const Team = require('../../entities/Team');
const TeamsService = require('../TeamServices');

const repositoryMock = {
    getAll: jest.fn(),
    getById: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const teamService = new TeamsService(repositoryMock);

test('Get all teams gets called 1 time', () => {
    teamService.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('getById gets called 1 time', () => {
    teamService.getById(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
});

test('create gets called 1 time', () => {
    teamService.create(new Team({ id: 1 }));
    expect(repositoryMock.add).toHaveBeenCalledTimes(1);
});

test('update gets called 1 time', () => {
    teamService.update(new Team({ id: 1 }));
    expect(repositoryMock.update).toHaveBeenCalledTimes(1);
});

test('delete gets called 1 time', () => {
    teamService.delete(new Team({ id: 1 }));
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});
