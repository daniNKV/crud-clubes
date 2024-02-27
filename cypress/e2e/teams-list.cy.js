describe('teams-list.cy.js', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display a list of teams', () => {
        cy.get('h1').contains('Teams');
        cy.get('table').find('tr').should('have.length', 3);
    });

    it('Should display a button to add a new team', () => {
        cy.get('a').contains('Add Team');
    });
});
