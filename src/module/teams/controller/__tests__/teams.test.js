const TeamsController = require('../TeamsController.js');
const Team = require('../../../../entities/Team.js');

const serviceMock = {
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(() => Promise.resolve(true)),
    getAll: jest.fn(() => Promise.resolve([])),
    getById: jest.fn(() => Promise.resolve({})),
};

const controller = new TeamsController(serviceMock);

test('getTeams should render all the teams of the league', async () => {
    const renderMock = jest.fn();

    await controller.getTeams({}, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('teams', {
        layout: 'base',
        teams: [],
    });
});

test('getTeam should render the team with the given id', async () => {
    const renderMock = jest.fn();
    const req = { params: { id: 1 } };

    await controller.getTeam(req, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('team', {
        layout: 'base',
        team: {},
    });
});

test('editTeam should render the form to edit the team with the given id', async () => {
    const renderMock = jest.fn();
    const req = { params: { id: 1 } };

    await controller.editTeam(req, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('form', {
        layout: 'base',
        team: {},
    });
});

test('editTeam should render the form to create a new team', async () => {
    const renderMock = jest.fn();
    const req = { params: { id: -1 } };

    await controller.editTeam(req, { render: renderMock });

    expect(renderMock).toHaveBeenCalledTimes(1);
    expect(renderMock).toHaveBeenCalledWith('form', {
        layout: 'base',
    });
});

test('saveTeam should call the create service with a body', async () => {
    const redirectMock = jest.fn();
    const FAKE_URL = 'fake-url/image.png';
    const bodyMock = new Team({
        id: NaN,
        name: undefined,
        area: undefined,
        address: undefined,
        clubColors: undefined,
        crestUrl: 'ejemplo/escudo.png',
        email: undefined,
        founded: undefined,
        phone: undefined,
        shortName: undefined,
        tla: undefined,
        venue: undefined,
        website: undefined,
    });

    // eslint-disable-next-line function-paren-newline
    await controller.saveTeam(
        { body: bodyMock, file: { path: FAKE_URL } }, { redirect: redirectMock });

    expect(serviceMock.create).toHaveBeenCalledTimes(1);
    expect(serviceMock.create).toHaveBeenCalledWith(bodyMock);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/teams');
});

test('saveTeam should call the update service with a body', async () => {
    const redirectMock = jest.fn();
    const FAKE_URL = 'fake-url/image.png';
    const bodyMock = new Team({
        id: 1,
        name: undefined,
        area: undefined,
        address: undefined,
        clubColors: undefined,
        crestUrl: 'ejemplo/escudo.png',
        email: undefined,
        founded: undefined,
        phone: undefined,
        shortName: undefined,
        tla: undefined,
        venue: undefined,
        website: undefined,
    });

    // eslint-disable-next-line function-paren-newline
    await controller.saveTeam(
        { body: bodyMock, file: { path: FAKE_URL } }, { redirect: redirectMock });

    expect(serviceMock.update).toHaveBeenCalledTimes(1);
    expect(serviceMock.update).toHaveBeenCalledWith(bodyMock);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/teams');
});

test('deleteTeam should call the delete service with the given id', async () => {
    const redirectMock = jest.fn();
    const req = { params: { id: 1 } };

    await controller.deleteTeam(req, { redirect: redirectMock });

    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(1);
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/teams');
});
