describe('navigation', () => {
  it('is redirect to project page', () => {
    cy.visit('/').url().should('be.equal', 'http://localhost:3000/projects');
  });
  it('dashboard switch on project detail page', () => {
    cy.visit('/');
    cy.get('a[data-cy="project-item-link"]').first().click();
    cy.get('button[data-cy="project-dashboard-button"]').click();
    cy.get('[data-cy="project-dashboard"]').should('exist');
    cy.get('button[data-cy="project-dashboard-button"]').click();
    cy.get('[data-cy="project-dashboard"]').should('not.exist');
  });
  it('access to country detail page', () => {
    cy.visit('/');
    cy.get('a[data-cy="sidebar-tab-countries"]').click();
    cy.get('a[data-cy="country-item-link"]').first().click();
    cy.get('[data-cy="country-detail-name"]').should('exist');
  });
  it('access and click on datasets', () => {
    cy.visit('/');
    cy.get('a[data-cy="sidebar-tab-datasets"]').click().wait(1000);
    cy.get('button[data-cy="info-soil-carbon-density-button"]').click();
    cy.get('div[data-cy="info-soil-carbon-density-dialog"]').should('exist');
    cy.get('button[data-cy="info-soil-carbon-density-dialog-close"]').click();
    cy.get('div[data-cy="info-soil-carbon-density-dialog"]').should('not.exist');
    // Todo: We would need to check layer activation on url and/or canvas
  });
});

describe('map', () => {
  it('changes basemap', () => {
    cy.visit('/');
    cy.get('button[data-cy="map-settings-button"]').click();
    cy.get('button[data-cy="basemap-satellite"]').click();
    // Todo: We would need to check if basemap is in the url
  });
  it('drags', () => {
    cy.visit('/');
    const map = cy.get('#default').wait(8000);
    map.should('exist');
    map
      .trigger('mouseenter', 700, 250)
      .trigger('mousedown', 700, 250, {
        bubbles: true,
        waitForAnimations: true,
        which: 1,
        pageX: 700,
        pageY: 150,
        force: true,
      })
      .wait(100)
      .trigger('mousemove', {
        pageX: 850,
        pageY: 550,
        which: 1,
        force: true,
      })
      .wait(200)
      .trigger('mouseup', {
        which: 1,
        pageX: 550,
        pageY: 250,
        force: true,
      })
      .wait(100);
  });
});
