describe('navigation', () => {
  it('redirects to project page', () => {
    cy.visit('/')
      .url()
      .should('be.equal', 'http://localhost:3000/projects?bbox=[62.91,-21.16,137.13,30.18]');
  });

  it('access to project detail page and switch dashboard', () => {
    cy.visit('/');
    cy.get('[data-cy="projects-list-tab"]').click();
    cy.get('a[data-cy="project-item-link"]').first().click();
    cy.get('button[data-cy="project-dashboard-button"]').click().wait(1000);
    cy.get('[data-cy="project-dashboard"]').should('exist');
    cy.get('button[data-cy="project-dashboard-button"]').click();
    cy.get('[data-cy="project-dashboard"]').should('not.exist');
  });

  it('access to country detail page', () => {
    cy.visit('/').wait(1000);
    cy.get('a[data-cy="sidebar-tab-countries"]').click().wait(10000);
    cy.get('a[data-cy="country-item-link"]').first().click();
    cy.get('[data-cy="country-detail-name"]').should('exist');
  });

  it('access to datasets and displays an info dialog', () => {
    cy.visit('/');
    cy.get('a[data-cy="sidebar-tab-datasets"]').click().wait(1000);
    cy.get('button[data-cy="info-soil-carbon-density-button"]').click();
    cy.get('div[data-cy="info-soil-carbon-density-dialog"]').should('exist');
    cy.get('button[data-cy="info-soil-carbon-density-dialog-close"]').click();
    cy.get('div[data-cy="info-soil-carbon-density-dialog"]').should('not.exist');
  });
});
