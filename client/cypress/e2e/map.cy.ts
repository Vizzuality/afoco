describe('map', () => {
  it('changes basemap', () => {
    cy.visit('/');
    cy.get('button[data-cy="map-settings-button"]').click();
    cy.get('button[data-cy="basemap-satellite"]').click();
    // Todo: We would need to check if basemap is in the url
  });

  it('loads', () => {
    cy.visit('/');
    const map = cy.get('#default').wait(8000);
    map.should('exist');
  });
});
