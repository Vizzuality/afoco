describe('navigation', () => {
  it('redirects to project page', () => {
    cy.visit('/').url().should('be.equal', 'http://localhost:3000/projects');
  });

  it('access to project detail page and switch dashboard', () => {
    cy.visit('/').wait(10000);
    cy.get('[data-cy="projects-list-tab"]').should('exist');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('[data-cy="project-item-link"]').first().click();
    cy.get('[data-cy="project-dashboard-button"]').click().wait(3000);
    cy.get('[data-cy="project-dashboard"]').should('exist');
    cy.get('[data-cy="project-dashboard-button"]').click();
    cy.get('[data-cy="project-dashboard"]').should('not.exist');
  });

  it('access to country detail page', () => {
    cy.visit('/').wait(10000);
    cy.get('a[data-cy="sidebar-tab-countries"]').click({ force: true }).wait(1000);
    cy.get('[data-cy="country-item"]').first().click().wait(10000);
    cy.get('[data-cy="country-detail-name"]').should('exist');
  });

  it('access to datasets and displays an info dialog', () => {
    cy.visit('/').wait(10000);
    cy.get('a[data-cy="sidebar-tab-datasets"]').click().wait(1000);
    cy.get('button[data-cy="info-soil-carbon-density-button"]').click();
    cy.get('div[data-cy="info-soil-carbon-density-dialog"]').should('exist');
    cy.get('button[data-cy="info-soil-carbon-density-dialog-close"]').click();
    cy.get('div[data-cy="info-soil-carbon-density-dialog"]').should('not.exist');
  });
});
