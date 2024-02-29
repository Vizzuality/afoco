describe('map', () => {
  it('loads', () => {
    cy.visit('/');
    const map = cy.get('#default').wait(8000);
    map.should('exist');
  });
});
