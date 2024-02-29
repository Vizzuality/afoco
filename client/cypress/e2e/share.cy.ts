describe('share', () => {
  it('share link by twitter', () => {
    cy.visit('/projects/indonesia-landscape');
    cy.get('[data-cy="share-tooltip-button"]').click();
    cy.get('button[data-cy="share-twitter-button"]').click();
    cy.visit(
      'https://twitter.com/intent/post?url=http%3A%2F%2Flocalhost%3A3000%2Fprojects%2Findonesia-landscape&text=indonesia-landscape'
    );
  });

  it('copy to clipboard', () => {
    cy.visit('/projects/indonesia-landscape');
    cy.get('[data-cy="share-tooltip-button"]').click();
    cy.get('button[data-cy="share-link-button"]').click();
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          // make the permission tighter by allowing the current origin only
          origin: window.location.origin,
        },
      })
    );
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq('http://localhost:3000/projects/indonesia-landscape');
      });
    });
  });
});
